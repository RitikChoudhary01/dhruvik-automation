export type ProjectStatus = "repo" | "prototype" | "concept";
export type ImplState = "built" | "prototype" | "in-progress" | "planned";
export type NodeKind = "io" | "logic" | "ai" | "data";

export type ArchNode = { name: string; note?: string; kind: NodeKind; planned?: boolean };
export type ArchLayer = { label: string; nodes: ArchNode[] };

export type WorkflowStep = {
  title: string;
  detail: string;
  payload?: Record<string, unknown>;
  failure?: string;
  planned?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  statusLabel: string;
  statusNote: string;
  audience: string;
  engineeringProblem: string;
  stack: string[];
  pipeline: string[];
  repo?: string;
  overview: string;
  problem: string;
  solution: string[];
  architecture: ArchLayer[];
  workflow: WorkflowStep[];
  decisions: { title: string; body: string }[];
  edgeCases: string[];
  limitations: string[];
  implemented: { item: string; state: ImplState }[];
  sample?: { title: string; note: string; payload: Record<string, unknown> };
  demoNote: string;
};

export const stateLabel: Record<ImplState, string> = {
  built: "Built",
  prototype: "In prototype",
  "in-progress": "In progress",
  planned: "Planned",
};

export const projects: Project[] = [
  {
    slug: "whatsapp-ai-receptionist",
    title: "WhatsApp AI Receptionist",
    summary:
      "Answers customer enquiries on WhatsApp and books appointments, with the database preventing double bookings.",
    status: "prototype",
    statusLabel: "Prototype",
    statusNote:
      "Built as an n8n workflow and run locally. It has not been deployed for a customer, so there are no usage results to report, and there is no public repository.",
    audience: "Clinics, salons and other appointment-based businesses that receive enquiries on WhatsApp.",
    engineeringProblem:
      "Two customers asking for the same slot at the same moment. An AI reply cannot be what prevents a double booking, so the database has to.",
    stack: ["n8n", "WhatsApp Business API", "OpenAI API", "Supabase (PostgreSQL)", "Google Calendar"],
    pipeline: ["Message", "Webhook", "Normalise", "AI agent", "Validate", "Database", "Reply"],
    overview:
      "A WhatsApp assistant for appointment-based businesses. It answers from business information you approve, collects the details a booking needs, and writes confirmed appointments to a database and calendar. When it is unsure, it hands the conversation to a person.",
    problem:
      "Enquiries arrive in the evening, at weekends, or while staff are with another customer. Replies come late, booking details are gathered over many messages, and appointments end up in chat threads where double bookings are easy to make and hard to notice.",
    solution: [
      "n8n receives each WhatsApp message through a webhook and reshapes it into one consistent format. An AI agent turns the free text into a structured result: the intent, the requested service and the requested time.",
      "Ordinary workflow logic then validates that result, checks availability and writes the booking to Supabase. The model decides what the customer is asking for. The workflow and the database decide what actually happens.",
    ],
    architecture: [
      { label: "Channel", nodes: [{ name: "WhatsApp message", kind: "io" }] },
      {
        label: "Intake",
        nodes: [
          { name: "Webhook", kind: "io" },
          { name: "Normalise and de-duplicate", kind: "logic" },
        ],
      },
      {
        label: "Understanding",
        nodes: [
          { name: "AI agent", note: "structured output", kind: "ai" },
          { name: "Conversation state", note: "Supabase", kind: "data" },
        ],
      },
      {
        label: "Rules",
        nodes: [
          { name: "Validate fields and hours", kind: "logic" },
          { name: "Availability check", kind: "logic" },
        ],
      },
      {
        label: "Persistence",
        nodes: [
          { name: "Appointments table", note: "unique slot", kind: "data" },
          { name: "Calendar event", kind: "data" },
        ],
      },
      {
        label: "Response",
        nodes: [
          { name: "WhatsApp reply", kind: "io" },
          { name: "Human handoff", kind: "io", planned: true },
        ],
      },
    ],
    workflow: [
      {
        title: "Receive the message",
        detail: "A webhook node receives the event from WhatsApp.",
        payload: { channel: "whatsapp", message_id: "wamid.sample-001", text: "Can I book a cleaning for Thursday afternoon?" },
      },
      {
        title: "Normalise and de-duplicate",
        detail:
          "Pull out phone number, text and message ID. Messaging platforms redeliver webhooks, so the message ID is stored first and a repeat is ignored.",
        payload: { phone_e164: "+91XXXXXXXXX10", seen_before: false },
        failure: "Repeated message ID: stop without replying twice.",
      },
      {
        title: "Load conversation state",
        detail: "Read the customer's conversation row so the workflow knows what it asked last.",
        payload: { stage: "collecting_details", customer_name: "Asha" },
      },
      {
        title: "Understand the request",
        detail: "The AI agent must return JSON that matches a defined structure. Free-form text is not accepted.",
        payload: { intent: "book_appointment", requested: { service: "cleaning", day: "Thursday", window: "afternoon" }, needs_human: false },
        failure: "Invalid structure: retry once, then hand the conversation to a person.",
      },
      {
        title: "Validate and check availability",
        detail: "Check required fields, business hours and open slots with plain logic, not with the model.",
        payload: { fields_valid: true, candidate_slot: "Thu 15:00", looks_free: true },
        failure: "Outside hours or no open slot: offer alternatives.",
      },
      {
        title: "Write the booking",
        detail:
          "Insert the appointment. A unique rule on the slot means that if two requests race, only one insert succeeds.",
        payload: { table: "appointments", insert: { slot: "Thu 15:00", status: "confirmed" } },
        failure: "Unique violation: no row is written, and the customer is offered other times.",
      },
      {
        title: "Reply and log",
        detail: "Send the confirmation, update the conversation state and record what happened.",
        payload: { reply_to_customer: "You're booked for Thursday at 3:00 pm.", conversation_state: "booked" },
      },
    ],
    decisions: [
      {
        title: "The model proposes, the workflow decides",
        body: "The agent returns structured fields. Booking actions run only from fields that passed validation, so a confident but wrong model answer cannot create an appointment on its own.",
      },
      {
        title: "Uniqueness lives in the database",
        body: "Checking availability and then inserting leaves a gap that two simultaneous requests can both slip through. A unique rule on the slot closes the gap: one insert wins, the other is rejected and handled.",
      },
      {
        title: "State in a table, not in the prompt",
        body: "Each conversation has a row with a stage field. The workflow can restart or run in parallel without losing track of what it asked the customer.",
      },
      {
        title: "Handoff is a normal branch",
        body: "Complaints, sensitive topics and repeated misunderstanding are routed to a person by design, not treated as errors.",
      },
    ],
    edgeCases: [
      "The same webhook is delivered twice: the stored message ID makes the second one a no-op.",
      "The customer sends several messages in quick succession: state is read and written per message, so each is handled in order.",
      "The requested slot is taken between the check and the insert: the unique rule rejects the insert and the customer is offered alternatives.",
      "The model returns something that does not match the structure: retry once, then escalate to a person.",
      "The calendar service is unavailable: do not confirm the booking, tell the customer that staff will confirm.",
      "A request outside business hours: explain the hours and offer the next open slot.",
    ],
    limitations: [
      "One business and one calendar. Supporting several businesses from one deployment is not built.",
      "Not load tested, and no analytics or reporting.",
      "WhatsApp restricts business-initiated messages outside its 24-hour customer window. Reminders and follow-ups would need approved message templates, which are not set up.",
    ],
    implemented: [
      { item: "Webhook intake and message normalisation", state: "prototype" },
      { item: "AI agent with structured output", state: "prototype" },
      { item: "Supabase storage for conversations and bookings", state: "prototype" },
      { item: "Calendar create, update and cancel actions", state: "prototype" },
      { item: "Duplicate-message protection", state: "in-progress" },
      { item: "Double-booking prevention with a database rule", state: "in-progress" },
      { item: "Human handoff", state: "planned" },
      { item: "Spam filtering and rate limits", state: "planned" },
      { item: "Retries, logging and failure alerts", state: "planned" },
      { item: "Multiple businesses from one deployment", state: "planned" },
    ],
    demoNote:
      "No screenshots are shown because there is no hosted product to screenshot. The step-through below uses sample data to show how one message moves through the workflow.",
  },
  {
    slug: "lead-management-revenue-recovery",
    title: "AI Lead Management and Revenue Recovery",
    summary:
      "Captures, qualifies and follows up every lead so that enquiries do not go cold, with one record of where each lead stands.",
    status: "prototype",
    statusLabel: "Prototype, demo data",
    statusNote:
      "A working prototype that runs on sample data. It has not been used by a client, so no recovered revenue or conversion figures are claimed anywhere on this site.",
    audience: "Service businesses and small sales teams that receive leads from forms, ads and calls and follow up by hand.",
    engineeringProblem:
      "Making follow-up safe to automate. A lead that arrives twice, or has already replied, must never trigger another message.",
    stack: ["n8n", "Webhooks", "Supabase (PostgreSQL)", "Google Sheets", "OpenAI API"],
    pipeline: ["Lead", "Webhook", "Validate", "De-duplicate", "Qualify", "Notify", "Follow up"],
    overview:
      "A lead pipeline that captures each enquiry, cleans and validates it, scores it against rules you define, notifies the right person and schedules follow-ups until the lead replies or is closed.",
    problem:
      "Leads arrive from forms, ads and missed calls. Someone copies them into a sheet hours later, strong leads wait in the same queue as weak ones, and follow-up depends on memory. Revenue is lost quietly, and nobody can see where.",
    solution: [
      "Every lead enters through one webhook, is reshaped into a standard record, and is checked for required fields and duplicates by phone number and email. Qualification uses explicit rules first and a language model only for fuzzy message text, returning a structured result with a short reason.",
      "Supabase is the system of record. Google Sheets mirrors it so the team can read it without a new tool. A follow-up scheduler looks up each lead's current state before sending anything, so leads who have replied are left alone.",
    ],
    architecture: [
      {
        label: "Sources",
        nodes: [
          { name: "Web form", kind: "io" },
          { name: "Ad lead form", kind: "io" },
          { name: "Message or missed call", kind: "io" },
        ],
      },
      {
        label: "Intake",
        nodes: [
          { name: "Webhook", kind: "io" },
          { name: "Normalise and validate", kind: "logic" },
          { name: "Duplicate check", kind: "logic" },
        ],
      },
      {
        label: "Qualification",
        nodes: [
          { name: "Rules", kind: "logic" },
          { name: "AI classification", note: "hot, warm, cold", kind: "ai" },
        ],
      },
      {
        label: "Records",
        nodes: [
          { name: "Leads and events", note: "Supabase", kind: "data" },
          { name: "Sheet mirror", kind: "data" },
        ],
      },
      {
        label: "Action",
        nodes: [
          { name: "Owner notification", kind: "io" },
          { name: "Follow-up scheduler", kind: "logic" },
        ],
      },
      {
        label: "Reporting",
        nodes: [{ name: "Conversion and recovery view", kind: "data", planned: true }],
      },
    ],
    workflow: [
      {
        title: "Lead arrives",
        detail: "A form, ad or message posts to one webhook.",
        payload: { source: "web_form", name: "Sample Lead", phone: "98XXXXXX10", message: "Need a quote for next week" },
      },
      {
        title: "Normalise and validate",
        detail: "Standardise the phone format, trim text and check required fields.",
        payload: { phone_e164: "+9198XXXXXX10", has_contact_method: true },
        failure: "Missing phone and email: park in a review queue with the reason. Never drop silently.",
      },
      {
        title: "Duplicate check",
        detail: "Look for an existing lead with the same phone number or email.",
        payload: { duplicate_of: null },
        failure: "Duplicate: attach the new event to the existing lead instead of creating another.",
      },
      {
        title: "Qualify",
        detail: "Rules score budget, location and urgency. The model reads the free-text message and returns a structured tier and reason.",
        payload: { tier: "warm", reason: "Asked for a quote with a date, budget not stated" },
        failure: "Unusable model output: tier becomes needs_review, never an automatic discard.",
      },
      {
        title: "Record and notify",
        detail: "Write the lead and an event to Supabase, mirror it to the sheet and notify the owner.",
        payload: { lead_status: "new", notified: "owner", sheet_row_added: true },
        failure: "Sheet API limit reached: the database write still succeeds and the mirror is retried.",
      },
      {
        title: "Follow-up loop",
        detail: "At each scheduled follow-up, read the lead's current status first. Stop if they replied, booked or opted out.",
        payload: { status_at_check: "no_reply", action: "send_follow_up_1" },
      },
      {
        title: "Report",
        detail: "Counts of leads, replies and bookings from the event log. This view is not built yet.",
        planned: true,
      },
    ],
    decisions: [
      {
        title: "Rules first, AI second",
        body: "Explicit criteria are predictable and easy to edit. The model is used only where rules cannot read the text, and its output is checked against a schema.",
      },
      {
        title: "The database is the record, the sheet is a view",
        body: "Teams like spreadsheets, but a sheet makes a poor source of truth. Writes go to Supabase first and the sheet is a copy, so a sheet edit or outage does not corrupt the lead history.",
      },
      {
        title: "Check state before every follow-up",
        body: "A follow-up is scheduled in advance, but whether to send it is decided at send time from the lead's current status.",
      },
      {
        title: "Log events, not just states",
        body: "Each action is stored as an event. Any later report on response time or follow-up outcomes is then counted from facts, not estimated.",
      },
    ],
    edgeCases: [
      "The same person submits through two channels: the duplicate check links both events to one lead.",
      "A lead has no phone and no email: it is parked for review with the reason recorded.",
      "The model returns an unusable result: the lead is marked needs_review.",
      "A lead replies in the middle of a follow-up sequence: the next scheduled step reads the new status and stops.",
      "A lead asks to stop contact: the status becomes opted_out and no further messages are sent.",
      "Google Sheets is rate limited: the database write is unaffected and the mirror retries later.",
    ],
    limitations: [
      "Runs on demo data only. No client has used it.",
      "Reporting is not built. A figure for revenue recovered can only come from a real deployment with measured data, so none is shown.",
      "Messaging channels have their own consent and template rules, for example WhatsApp message templates. These need to be handled per channel before real use.",
    ],
    implemented: [
      { item: "Webhook intake, normalisation and validation", state: "prototype" },
      { item: "Duplicate detection by phone and email", state: "prototype" },
      { item: "Rule and AI qualification with a structured result", state: "prototype" },
      { item: "Supabase and Google Sheets recording", state: "prototype" },
      { item: "Owner notification", state: "prototype" },
      { item: "Follow-up scheduling with a state check", state: "in-progress" },
      { item: "Conversion and recovery reporting", state: "planned" },
      { item: "Failure alerts and a review dashboard", state: "planned" },
    ],
    demoNote:
      "There is no hosted dashboard to screenshot, so none is faked. The step-through below uses sample data to show one lead moving through the pipeline.",
  },
  {
    slug: "ai-invoice-parser",
    title: "AI Invoice and Document Parser",
    summary:
      "A FastAPI service that turns a PDF invoice into validated JSON, with the model's output checked against a schema.",
    status: "repo",
    statusLabel: "Working code, public repository",
    statusNote:
      "The source is public and the behaviour described here comes from reading it. It is a small single-file service, and the limits are listed openly below.",
    audience: "Finance and operations teams, and developers, who need invoice data as JSON instead of retyping it.",
    engineeringProblem:
      "Models return text that looks like JSON. The service forces JSON mode, parses the output and validates it with Pydantic, so bad output becomes a clear error instead of bad data downstream.",
    stack: ["Python", "FastAPI", "Pydantic", "pypdf", "Gemini API"],
    pipeline: ["PDF upload", "Check file", "Extract text", "Model", "Parse JSON", "Validate", "Response"],
    repo: "https://github.com/RitikChoudhary01/ai-invoice-parser",
    overview:
      "A FastAPI service with one main endpoint. Upload a PDF invoice and receive structured JSON with the vendor, invoice number, issue date, total, currency and line items.",
    problem:
      "Typing invoice details into accounting tools is slow and error-prone. Invoices come in many layouts, so fixed templates break as soon as a new vendor appears.",
    solution: [
      "The service accepts a PDF, extracts its text with pypdf and sends that text to Gemini with a system prompt that defines the JSON structure. The request uses JSON response mode and temperature zero to keep the output stable.",
      "The reply is parsed and then validated against a Pydantic model. Only validated data is returned. A non-PDF, an unreadable PDF or an invalid model reply each produce a defined HTTP error.",
    ],
    architecture: [
      { label: "Client", nodes: [{ name: "PDF upload", kind: "io" }] },
      {
        label: "API",
        nodes: [
          { name: "POST /api/v1/process-document", kind: "io" },
          { name: "File type check", kind: "logic" },
        ],
      },
      {
        label: "Extraction",
        nodes: [
          { name: "pypdf text extraction", kind: "logic" },
          { name: "Empty-text check", kind: "logic" },
        ],
      },
      { label: "Model", nodes: [{ name: "Gemini", note: "JSON mode, temperature 0", kind: "ai" }] },
      {
        label: "Validation",
        nodes: [
          { name: "JSON parse", kind: "logic" },
          { name: "Pydantic InvoiceData", kind: "logic" },
        ],
      },
      { label: "Response", nodes: [{ name: "JSON or HTTP error", kind: "io" }] },
    ],
    workflow: [
      {
        title: "Upload the PDF",
        detail: "A multipart upload to the main endpoint.",
        payload: { request: "POST /api/v1/process-document", file: "invoice.pdf" },
      },
      {
        title: "Check the file",
        detail: "Only filenames ending in .pdf are accepted.",
        payload: { status: 400, detail: "Only PDF files are allowed." },
        failure: "Any other file type returns this 400 error.",
      },
      {
        title: "Extract the text",
        detail:
          "pypdf reads each page. Optional environment settings cap the number of pages and characters sent to the model.",
        payload: { MAX_PDF_PAGES: "0 means no limit", MAX_TEXT_CHARS: "0 means no limit" },
        failure: "No text found: 400 \"PDF is empty or unreadable.\"",
      },
      {
        title: "Call the model",
        detail: "The system prompt defines the target JSON. The request asks for JSON output at temperature zero.",
        payload: { model: "gemini-2.5-flash (default, configurable)", response_mime_type: "application/json", temperature: 0 },
      },
      {
        title: "Parse the reply",
        detail: "Remove stray markdown fences if present, then parse the JSON.",
        failure: "Not valid JSON: 500 \"AI returned invalid JSON.\"",
      },
      {
        title: "Validate with Pydantic",
        detail: "The parsed data must fit the InvoiceData model: strings, a numeric total and a list of line items.",
        failure: "Does not fit the model: the request fails with a 500 error.",
      },
      {
        title: "Return the result",
        detail: "FastAPI returns the validated object, and the interactive docs at /docs describe the same schema.",
        payload: {
          vendor_name: "Example Supplies Ltd",
          invoice_number: "INV-1042",
          date_issued: "2026-03-12",
          total_amount: 4238.0,
          currency: "USD",
          items: [
            { description: "Solar panel 400W x10", amount: 1990.0 },
            { description: "Inverter 5K x2", amount: 1798.0 },
            { description: "Mounting kit x10", amount: 450.0 },
          ],
        },
      },
    ],
    decisions: [
      {
        title: "Define the schema twice on purpose",
        body: "The prompt tells the model what to return. Pydantic then verifies what actually came back. The first reduces bad output, the second catches what slips through.",
      },
      {
        title: "Constrain the model",
        body: "JSON response mode and temperature zero make the output format and content as repeatable as a model allows.",
      },
      {
        title: "Tunables through environment variables",
        body: "The model name, page cap and character cap can change without code changes, which helps manage speed and cost.",
      },
      {
        title: "Fail early on configuration",
        body: "The service refuses to start if the API key is missing, so a misconfigured deployment shows up immediately, not on the first request.",
      },
    ],
    edgeCases: [
      "A file that is not a PDF: rejected with a 400 error.",
      "A PDF with no extractable text: rejected with a 400 error.",
      "The model returns JSON wrapped in markdown fences: the fences are stripped before parsing.",
      "The model returns something that is not JSON: a 500 error with a clear message.",
      "The API key is missing: the service raises an error at startup.",
    ],
    limitations: [
      "Scanned or image-only PDFs have no text layer. There is no OCR, so they are rejected as unreadable.",
      "The prompt asks for empty strings when a value is missing, but the schema expects a number for the total and amounts. A missing numeric value can therefore fail validation and return a 500, where a 422 with field details would be clearer. This is the first thing I would fix.",
      "Dates and currency codes are plain strings and are not checked for format.",
      "There is no check that line items add up to the total, and no per-field confidence or human review step.",
      "There is no authentication, rate limiting or automated test suite in the repository yet.",
    ],
    implemented: [
      { item: "PDF upload endpoint with file-type check", state: "built" },
      { item: "Text extraction with optional page and size caps", state: "built" },
      { item: "Gemini call in JSON mode at temperature 0", state: "built" },
      { item: "Pydantic validation of the model output", state: "built" },
      { item: "Health check endpoint and startup key check", state: "built" },
      { item: "422 responses with per-field detail", state: "planned" },
      { item: "OCR for scanned documents", state: "planned" },
      { item: "Totals cross-check and review queue", state: "planned" },
      { item: "Automated tests", state: "planned" },
    ],
    sample: {
      title: "Response shape",
      note: "The structure comes from the Pydantic model in the repository. The values are made up for illustration and are not output from a real invoice.",
      payload: {
        vendor_name: "Example Supplies Ltd",
        invoice_number: "INV-1042",
        date_issued: "2026-03-12",
        total_amount: 4238.0,
        currency: "USD",
        items: [
          { description: "Solar panel 400W x10", amount: 1990.0 },
          { description: "Inverter 5K x2", amount: 1798.0 },
          { description: "Mounting kit x10", amount: 450.0 },
        ],
      },
    },
    demoNote:
      "The service needs your own Gemini API key to run, so there is no hosted demo. Clone the repository to run it locally, or step through the pipeline below.",
  },
  {
    slug: "ai-knowledge-assistant",
    title: "AI Knowledge Assistant",
    summary:
      "An assistant that answers only from approved documents, cites its sources and hands over when it does not know.",
    status: "concept",
    statusLabel: "Design case study",
    statusNote:
      "Not yet built as a deployable assistant. This page shows how I would build it, using the retrieval tools I have worked with. Nothing here is presented as running.",
    audience: "Businesses whose staff or customers keep asking questions that the company's own documents already answer.",
    engineeringProblem:
      "Knowing when not to answer. A wrong answer about a refund policy costs more than a slow one, so the assistant needs a clear rule for refusing.",
    stack: ["Python", "FastAPI", "ChromaDB", "Gemini embeddings", "Groq-hosted LLM", "n8n for handoff"],
    pipeline: ["Documents", "Chunk and embed", "Retrieve", "Relevance gate", "Answer with sources", "Fallback"],
    overview:
      "An assistant that answers questions using only documents a business has approved. Each answer names its source. When nothing relevant is found, it says so and passes the question to a person.",
    problem:
      "Policies, prices and procedures are scattered across PDFs and chat threads, and the same questions get asked repeatedly. A general chatbot fills gaps with guesses, which is unacceptable when the answer affects money or customers.",
    solution: [
      "Approved documents are split into sections, embedded and stored in a vector database along with the document name and section. A question retrieves the closest sections, and a relevance threshold decides whether there is enough evidence to answer at all.",
      "If there is, the model answers from the retrieved text only and cites it. If there is not, the assistant says it does not know and a workflow notifies a person with the original question.",
    ],
    architecture: [
      { label: "Sources", nodes: [{ name: "Approved PDFs and text", kind: "io", planned: true }] },
      {
        label: "Ingestion",
        nodes: [
          { name: "Section chunking", kind: "logic", planned: true },
          { name: "Embeddings", kind: "ai", planned: true },
        ],
      },
      { label: "Index", nodes: [{ name: "ChromaDB", note: "with source metadata", kind: "data", planned: true }] },
      {
        label: "Query",
        nodes: [
          { name: "Retrieve top sections", kind: "logic", planned: true },
          { name: "Relevance gate", kind: "logic", planned: true },
        ],
      },
      { label: "Answer", nodes: [{ name: "LLM, context only, with citations", kind: "ai", planned: true }] },
      { label: "Fallback", nodes: [{ name: "Notify a person", note: "n8n", kind: "io", planned: true }] },
    ],
    workflow: [
      {
        title: "Ingest approved documents",
        detail: "Only documents placed in an approved set are indexed. Each section keeps its document name and section title.",
        payload: { document: "refund-policy.pdf", section: "Eligibility", chunk_id: "refund-policy-03" },
      },
      {
        title: "Retrieve for a question",
        detail: "Embed the question and fetch the closest sections with their similarity scores.",
        payload: { question: "Can I get a refund after 30 days?", top_k: 3 },
      },
      {
        title: "Apply the relevance gate",
        detail: "If the best match is below a tuned threshold, stop. No model call is made to improvise an answer.",
        failure: "Below threshold: reply that the information is not available and notify a person.",
      },
      {
        title: "Answer from context only",
        detail: "The model gets the retrieved sections and an instruction to answer only from them and to cite the section.",
        payload: { answer: "(generated from retrieved text)", sources: ["refund-policy.pdf, Eligibility"] },
      },
      {
        title: "Escalate when needed",
        detail: "Unanswerable, sensitive or low-confidence questions create a notification with the original question.",
        failure: "Questions about personal data or accounts are always routed to a person.",
      },
    ],
    decisions: [
      {
        title: "Refusing is a feature",
        body: "The relevance threshold is checked before any answer is generated. A clear \"I don't know\" is safer than a plausible guess.",
      },
      {
        title: "Source citations on every answer",
        body: "Each answer names the document and section it came from, so a reader can verify it in seconds.",
      },
      {
        title: "Treat documents as data, not instructions",
        body: "Text inside indexed documents could contain instructions aimed at the model. Retrieved text is passed as quoted material and the system instruction is never taken from it.",
      },
      {
        title: "Test with a question set",
        body: "A list of real questions with the expected source section lets the threshold and chunking be tuned with evidence instead of by feel.",
      },
    ],
    edgeCases: [
      "A question that spans two documents: retrieve from both and cite both.",
      "Two documents disagree: surface both citations and flag the conflict for a person.",
      "A document is out of date: re-ingest on change and record the update date in metadata.",
      "A question about an individual's account: do not answer, route to a person.",
      "A document contains text that tries to instruct the model: it is treated as content only.",
    ],
    limitations: [
      "Nothing in this case study is built or tested yet.",
      "Answer quality depends on document quality and on tuning the threshold against real questions, which needs real documents from a real business.",
      "Documents with tables, scans or heavy formatting need extra extraction work.",
    ],
    implemented: [
      { item: "Document ingestion and chunking", state: "planned" },
      { item: "Embedding and vector index", state: "planned" },
      { item: "Retrieval with relevance gate", state: "planned" },
      { item: "Cited answers from retrieved text", state: "planned" },
      { item: "Human handoff workflow", state: "planned" },
      { item: "Question set for evaluation", state: "planned" },
    ],
    demoNote:
      "There is nothing running to screenshot or demonstrate, so the step-through below shows the intended flow with illustrative values.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
