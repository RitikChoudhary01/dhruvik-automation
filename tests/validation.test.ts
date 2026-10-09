import { describe, expect, it } from "vitest";
import { validateContact } from "@/lib/validation";

const valid = {
  name: "Asha Rao",
  email: "asha@clinic.example",
  company: "Rao Dental",
  service: "WhatsApp AI receptionist",
  message: "We answer every WhatsApp enquiry by hand and miss many after hours.",
  budget: "",
};

describe("validateContact", () => {
  it("accepts a complete valid inquiry and treats budget as optional", () => {
    const result = validateContact(valid);
    expect(result.ok).toBe(true);
  });

  it("returns an error for every missing required field", () => {
    const result = validateContact({});
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(Object.keys(result.errors).sort()).toEqual(["company", "email", "message", "name", "service"]);
    }
  });

  it.each(["plainaddress", "no@tld", "@missing.com", "a b@c.com"])("rejects invalid email %s", (email) => {
    const result = validateContact({ ...valid, email });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.email).toBeDefined();
  });

  it("rejects a message that is too short or too long", () => {
    expect(validateContact({ ...valid, message: "too short" }).ok).toBe(false);
    expect(validateContact({ ...valid, message: "x".repeat(2001) }).ok).toBe(false);
  });

  it("rejects a service or budget that is not in the list", () => {
    expect(validateContact({ ...valid, service: "Anything" }).ok).toBe(false);
    expect(validateContact({ ...valid, budget: "a million" }).ok).toBe(false);
  });

  it("trims whitespace and ignores non-string input", () => {
    const result = validateContact({ ...valid, name: "  Asha Rao  ", company: 42 });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.company).toBeDefined();
    const ok = validateContact({ ...valid, name: "  Asha Rao  " });
    expect(ok.ok && ok.data.name).toBe("Asha Rao");
  });
});
