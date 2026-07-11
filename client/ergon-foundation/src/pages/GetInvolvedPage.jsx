import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import Reveal, { Stagger, StaggerItem } from "../components/Reveal.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";
import { VolunteerIcon, BriefcaseIcon, UploadIcon, CheckIcon, HeartHandsIcon, GraduationCapIcon, PawIcon } from "../components/Icons.jsx";

const VOLUNTEER_WAYS = [
  { icon: HeartHandsIcon, title: "Community Drives", desc: "Join education, healthcare and livelihood outreach in the field." },
  { icon: PawIcon, title: "Animal Rescue", desc: "Support rescue operations and shelter care for animals in need." },
  { icon: GraduationCapIcon, title: "Mentor A Child", desc: "Guide an EduSPro sponsored student through their school journey." },
];

function Field({ label, opt, full, children }) {
  return (
    <div className={`field${full ? " full" : ""}`}>
      <label>{label} {opt && <span className="opt">(optional)</span>}</label>
      {children}
    </div>
  );
}

export default function GetInvolvedPage() {
  const [params] = useSearchParams();
  const [tab, setTab] = useState(params.get("tab") === "career" ? "career" : "volunteer");
  const [role, setRole] = useState("seeker");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHero crumb="Get Involved" eyebrow="Join Us" title="Be The Reason Someone Smiles Today" sub="Give your time as a volunteer, or connect through ERGON's Career Opportunities programme — for job seekers and employers alike." />

      <section className="section section--paper">
        <div className="wrap">
          <Reveal as="up" className="center mb-32">
            <div className="tabbar mx-auto" style={{ display: "flex" }}>
              <button className={tab === "volunteer" ? "active" : ""} onClick={() => setTab("volunteer")}>Volunteer With Us</button>
              <button className={tab === "career" ? "active" : ""} onClick={() => setTab("career")}>Career Opportunities</button>
            </div>
          </Reveal>

          {tab === "volunteer" && (
            <Reveal as="fade">
              <div className="grid-2 mb-32" style={{ alignItems: "center" }}>
                <PhotoFrame src="/images/gallery-03-pledge.jpg" alt="Volunteers and children taking the ERGON pledge together" ratio="16/10" />
                <div>
                  <div className="eyebrow">Every Hand Helps</div>
                  <h3 className="h-md">From The Field, With Gratitude</h3>
                  <p className="lede mt-16" style={{ maxWidth: "44ch" }}>
                    Whether it's an afternoon at a rescue drive or mentoring one child through school, ERGON
                    volunteers are the roots that keep every programme growing.
                  </p>
                </div>
              </div>
              <Stagger className="grid-3 mb-24">
                {VOLUNTEER_WAYS.map((w, i) => (
                  <StaggerItem key={i}>
                    <div className="card">
                      <div className="icon-badge"><w.icon /></div>
                      <h4 className="h-sm">{w.title}</h4>
                      <p style={{ fontSize: "0.88rem", color: "var(--ink-500)", marginTop: 6 }}>{w.desc}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>

              <div className="form-card mt-32">
                {submitted ? (
                  <SuccessNote onReset={() => setSubmitted(false)} text="Thank you — we've received your interest and will reach out soon." />
                ) : (
                  <form onSubmit={onSubmit}>
                    <div className="eyebrow"><VolunteerIcon style={{ width: 16, height: 16, marginRight: 6, verticalAlign: -3 }} />Volunteer Sign-Up</div>
                    <h3 className="h-sm">Tell Us About Yourself</h3>
                    <div className="form-grid">
                      <Field label="Full Name"><input required placeholder="Your name" /></Field>
                      <Field label="Contact Number"><input required placeholder="+91" /></Field>
                      <Field label="Email ID"><input type="email" required placeholder="you@email.com" /></Field>
                      <Field label="City"><input placeholder="Chennai" /></Field>
                      <Field label="Area Of Interest">
                        <select defaultValue="">
                          <option value="" disabled>Select an area</option>
                          <option>People</option>
                          <option>Pets</option>
                          <option>Planet</option>
                          <option>Community Development</option>
                        </select>
                      </Field>
                      <Field label="Availability">
                        <select defaultValue="">
                          <option value="" disabled>Select availability</option>
                          <option>Weekdays</option>
                          <option>Weekends</option>
                          <option>Flexible</option>
                        </select>
                      </Field>
                      <Field label="Message" opt full><textarea placeholder="Anything you'd like us to know" /></Field>
                    </div>
                    <button type="submit" className="btn btn--primary mt-24">Submit Interest <CheckIcon /></button>
                  </form>
                )}
              </div>
            </Reveal>
          )}

          {tab === "career" && (
            <Reveal as="fade">
              <div className="card mb-32" style={{ maxWidth: 760, margin: "0 auto 32px" }}>
                <div className="icon-badge"><BriefcaseIcon /></div>
                <p style={{ color: "var(--ink-700)" }}>
                  ERGON Foundation supports employers and job seekers by connecting the right talent with the
                  right opportunities. Candidates can submit their profiles and career expectations, while
                  employers can share their manpower requirements — ERGON helps facilitate suitable placements.
                </p>
              </div>

              <div className="center mb-24">
                <div className="tabbar mx-auto" style={{ display: "flex" }}>
                  <button className={role === "seeker" ? "active" : ""} onClick={() => setRole("seeker")}>For Job Seekers</button>
                  <button className={role === "employer" ? "active" : ""} onClick={() => setRole("employer")}>For Employers</button>
                </div>
              </div>

              <div className="form-card">
                {submitted ? (
                  <SuccessNote onReset={() => setSubmitted(false)} text="Thank you — your form has been submitted. ERGON's placement team will be in touch." />
                ) : role === "seeker" ? (
                  <form onSubmit={onSubmit} key="seeker">
                    <h3 className="h-sm">Job Seeker Profile</h3>
                    <div className="form-grid">
                      <Field label="Full Name"><input required /></Field>
                      <Field label="Date Of Birth"><input type="date" /></Field>
                      <Field label="Gender">
                        <select defaultValue=""><option value="" disabled>Select</option><option>Female</option><option>Male</option><option>Other</option></select>
                      </Field>
                      <Field label="Educational Qualification"><input /></Field>
                      <Field label="Address" opt full><input /></Field>
                      <Field label="Contact Number"><input required /></Field>
                      <Field label="Email ID"><input type="email" required /></Field>
                      <Field label="Years Of Experience"><input placeholder="e.g. 2 years" /></Field>
                      <Field label="Skills" opt full><input placeholder="Comma separated" /></Field>
                      <Field label="Preferred Job Role"><input /></Field>
                      <Field label="Preferred Industry"><input /></Field>
                      <Field label="Preferred Location"><input /></Field>
                      <Field label="Current CTC" opt><input /></Field>
                      <Field label="Expected CTC" opt><input /></Field>
                      <Field label="Notice Period" opt><input /></Field>
                      <Field label="Languages Known" opt><input /></Field>
                      <div className="field full">
                        <label>Resume / CV Upload</label>
                        <div className="file-drop"><UploadIcon /><div>Drag &amp; drop your resume, or click to browse (PDF, DOC)</div></div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn--primary mt-24">Submit Profile <CheckIcon /></button>
                  </form>
                ) : (
                  <form onSubmit={onSubmit} key="employer">
                    <h3 className="h-sm">Employer Requirement</h3>
                    <div className="form-grid">
                      <Field label="Name Of The Organization"><input required /></Field>
                      <Field label="Contact Person"><input required /></Field>
                      <Field label="Designation"><input /></Field>
                      <Field label="Contact Number"><input required /></Field>
                      <Field label="Email ID"><input type="email" required /></Field>
                      <Field label="Industry Type"><input /></Field>
                      <Field label="Job Role Required"><input /></Field>
                      <Field label="Number Of Vacancies"><input type="number" min="1" /></Field>
                      <Field label="Qualification Required"><input /></Field>
                      <Field label="Experience Required"><input /></Field>
                      <Field label="Salary Range (CTC)"><input /></Field>
                      <Field label="Job Location"><input /></Field>
                      <Field label="Employment Type">
                        <select defaultValue=""><option value="" disabled>Select</option><option>Full Time</option><option>Part Time</option><option>Internship</option></select>
                      </Field>
                      <Field label="Additional Expectations" opt full><textarea /></Field>
                      <div className="field full">
                        <label>Job Description Upload <span className="opt">(optional)</span></label>
                        <div className="file-drop"><UploadIcon /><div>Drag &amp; drop the JD file, or click to browse</div></div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn--primary mt-24">Submit Requirement <CheckIcon /></button>
                  </form>
                )}
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}

function SuccessNote({ text, onReset }) {
  return (
    <div className="center" style={{ padding: "20px 0" }}>
      <div className="icon-badge mx-auto" style={{ background: "var(--gold-600)", color: "var(--forest-950)" }}><CheckIcon /></div>
      <h3 className="h-sm">Thank You</h3>
      <p style={{ color: "var(--ink-500)", marginTop: 8 }}>{text}</p>
      <button className="btn btn--ghost btn--sm mt-16" onClick={onReset}>Submit Another Response</button>
    </div>
  );
}
