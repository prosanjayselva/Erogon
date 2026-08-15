import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { NavLink, useSearchParams } from "react-router-dom";
import Reveal, { Stagger, StaggerItem } from "../components/Reveal.jsx";
import { PHOTOS } from "../data/photos.js";
import {
  VolunteerIcon, BriefcaseIcon, UploadIcon, CheckIcon, HeartHandsIcon,
  PawIcon, LeafIcon, SparkleIcon, TargetIcon,
  UsersGroupIcon, PinIcon, ArrowRightIcon, DonateHeartIcon,
} from "../components/Icons.jsx";
import api from "../api/client.js";
import { CAREER_INTRO } from "../data/content.js";
import { BrandText } from "../components/BrandName.jsx";

const VOLUNTEER_WAYS = [
  { icon: HeartHandsIcon, title: "Community Drives", desc: "Join education, healthcare and livelihood outreach in the field." },
  { icon: PawIcon, title: "Animal Rescue", desc: "Support rescue operations and shelter care for animals in need." },
  { icon: LeafIcon, title: "Environment Drives", desc: "Participate in tree planting, beach clean-ups and awareness campaigns." },
  { icon: UsersGroupIcon, title: "Event Support", desc: "Help organise fundraisers, camps and community events." },
];

const VOLUNTEER_BENEFITS = [
  { icon: SparkleIcon, title: "Hands-On Impact", desc: "See the difference you make, firsthand in the community." },
  { icon: TargetIcon, title: "Skill Development", desc: "Gain real-world experience in social work and project management." },
  { icon: HeartHandsIcon, title: "Community & Connection", desc: "Join a family of like-minded changemakers." },
];

const CAREER_BENEFITS = [
  { icon: SparkleIcon, title: "Purpose-Driven Work", desc: "Build a career that makes a tangible difference every day." },
  { icon: TargetIcon, title: "Growth & Learning", desc: "Access training, mentorship and professional development." },
  { icon: HeartHandsIcon, title: "Supportive Culture", desc: "Work with a team that values compassion, transparency and impact." },
];

function Field({ label, opt, full, children }) {
  return (
    <div className={`field${full ? " full" : ""}`}>
      <label>{label} {opt && <span className="opt">(optional)</span>}</label>
      {children}
    </div>
  );
}

function SuccessNote({ text, onReset }) {
  return (
    <div className="center" style={{ padding: "40px 0" }}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <div className="icon-badge mx-auto" style={{ background: "var(--gold)", color: "var(--text)", width: 72, height: 72 }}>
          <CheckIcon style={{ width: 32, height: 32 }} />
        </div>
      </motion.div>
      <h3 className="h-md mt-16">Thank You</h3>
      <p style={{ color: "var(--text-secondary)", marginTop: 8, maxWidth: 480 }}>{text}</p>
      <button className="btn btn--ghost btn--sm mt-24" onClick={onReset}>Submit Another Response</button>
    </div>
  );
}

const EMPTY_VOLUNTEER = { fullName: "", contactNumber: "", email: "", city: "", areaOfInterest: "", availability: "", message: "" };
const EMPTY_SEEKER = { fullName: "", dob: "", gender: "", qualification: "", address: "", contactNumber: "", email: "", experience: "", skills: "", preferredRole: "", preferredIndustry: "", preferredLocation: "", currentCTC: "", expectedCTC: "", noticePeriod: "", languages: "" };
const EMPTY_EMPLOYER = { organization: "", contactPerson: "", designation: "", contactNumber: "", email: "", industryType: "", jobRole: "", vacancies: "", qualification: "", experience: "", salaryRange: "", jobLocation: "", employmentType: "", expectations: "" };

export default function GetInvolvedPage({ careersOnly = false }) {
  const [params] = useSearchParams();
  const [tab, setTab] = useState(careersOnly || params.get("tab") === "career" ? "career" : "volunteer");
  const [role, setRole] = useState("seeker");

  const [volSubmitted, setVolSubmitted] = useState(false);
  const [volSending, setVolSending] = useState(false);
  const [volForm, setVolForm] = useState(EMPTY_VOLUNTEER);

  const [seekerSubmitted, setSeekerSubmitted] = useState(false);
  const [seekerSending, setSeekerSending] = useState(false);
  const [seekerForm, setSeekerForm] = useState(EMPTY_SEEKER);
  const seekerFileRef = useRef(null);
  const [seekerFile, setSeekerFile] = useState(null);

  const [employerSubmitted, setEmployerSubmitted] = useState(false);
  const [employerSending, setEmployerSending] = useState(false);
  const [employerForm, setEmployerForm] = useState(EMPTY_EMPLOYER);
  const employerFileRef = useRef(null);
  const [employerFile, setEmployerFile] = useState(null);

  const [error, setError] = useState("");

  const setVol = (k) => (e) => setVolForm((p) => ({ ...p, [k]: e.target.value }));
  const setSeeker = (k) => (e) => setSeekerForm((p) => ({ ...p, [k]: e.target.value }));
  const setEmployer = (k) => (e) => setEmployerForm((p) => ({ ...p, [k]: e.target.value }));

  const submitVolunteer = async (e) => {
    e.preventDefault();
    setError("");
    setVolSending(true);
    try {
      await api.post("/volunteers", volForm);
      setVolSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setVolSending(false);
    }
  };

  const submitSeeker = async (e) => {
    e.preventDefault();
    setError("");
    setSeekerSending(true);
    try {
      const fd = new FormData();
      Object.entries(seekerForm).forEach(([k, v]) => { if (v) fd.append(k, v); });
      if (seekerFile) fd.append("resume", seekerFile);
      await api.post("/job-seekers", fd);
      setSeekerSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setSeekerSending(false);
    }
  };

  const submitEmployer = async (e) => {
    e.preventDefault();
    setError("");
    setEmployerSending(true);
    try {
      const fd = new FormData();
      Object.entries(employerForm).forEach(([k, v]) => { if (v) fd.append(k, v); });
      if (employerFile) fd.append("jd", employerFile);
      await api.post("/employers", fd);
      setEmployerSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setEmployerSending(false);
    }
  };

  const resetVolunteer = () => { setVolForm(EMPTY_VOLUNTEER); setVolSubmitted(false); setError(""); };
  const resetSeeker = () => { setSeekerForm(EMPTY_SEEKER); setSeekerSubmitted(false); setSeekerFile(null); setError(""); };
  const resetEmployer = () => { setEmployerForm(EMPTY_EMPLOYER); setEmployerSubmitted(false); setEmployerFile(null); setError(""); };

  const switchRole = (r) => { setRole(r); setError(""); };

  return (
    <>
      {careersOnly ? (
        <section className="career-hero">
          <div className="career-hero__inner">
            <motion.div className="career-hero__content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="glass-card career-hero__intro" style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
                <div className="icon-badge" style={{ marginBottom: 0, flex: "none", width: 64, height: 64, background: "var(--gold)", color: "var(--text)" }}><BriefcaseIcon /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 className="h-md">ERGON Career Opportunities</h3>
                  <p style={{ marginTop: 6 }}>
                    <BrandText>{CAREER_INTRO}</BrandText>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ) : (
        <section className="volunteer-hero">
          <div className="volunteer-hero__bg"><img src={PHOTOS.yercaudDance} alt="Volunteers and children enjoying a community event" /></div>
          <div className="volunteer-hero__overlay" />
          <div className="volunteer-hero__inner">
            <motion.div className="volunteer-hero__content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <h1 className="volunteer-hero__title">Be The Reason Someone Smiles Today</h1>
            </motion.div>
          </div>
        </section>
      )}

      <section className="section section--paper">
        <div className="wrap">
          <Reveal as="up" className="center mb-32" style={{ display: careersOnly ? "none" : undefined }}>
            <div className="tabbar mx-auto">
              <button className={tab === "volunteer" ? "active" : ""} onClick={() => setTab("volunteer")}>Volunteer With Us</button>
              <NavLink className="tabbar-link" to="/donate#payment-details">Donate</NavLink>
            </div>
          </Reveal>

          {tab === "volunteer" && (
            <Reveal as="fade" id="volunteer">
              <Reveal as="up" className="text-center mb-32">
                <div className="eyebrow" style={{ justifyContent: "center" }}>Ways To Volunteer</div>
                <h2 className="h-lg">Choose How You <span className="text-gold">Contribute</span></h2>
              </Reveal>
              <Stagger className="grid-3 mb-48">
                {VOLUNTEER_WAYS.map((w, i) => (
                  <StaggerItem key={i}>
                    <div className="card" style={{ textAlign: "center", padding: "36px 24px" }}>
                      <div className="icon-badge mx-auto"><w.icon /></div>
                      <h4 className="h-sm">{w.title}</h4>
                      <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginTop: 6 }}>{w.desc}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>

              <div className="impact-band mb-48" style={{ background: "var(--primary)" }}>
                <div className="impact-band__inner impact-band__inner--alt">
                  <div className="impact-band__title">
                    <div className="eyebrow">Why Volunteer</div>
                    <h3 className="h-md" style={{ color: "white" }}>What You'll Gain</h3>
                  </div>
                  <div className="benefits-grid">
                    {VOLUNTEER_BENEFITS.map((b, i) => (
                      <div className="impact-stat" key={i} style={{ textAlign: "left", padding: "20px" }}>
                        <b.icon />
                        <b style={{ display: "block", color: "white", fontFamily: "var(--font-heading)", fontSize: "1.05rem", marginTop: 8 }}>{b.title}</b>
                        <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", marginTop: 4 }}>{b.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Reveal as="up">
                <div className="form-card">
                  {volSubmitted ? (
                    <SuccessNote onReset={resetVolunteer} text="Thank you — we've received your interest and will reach out soon." />
                  ) : (
                    <form onSubmit={submitVolunteer}>
                      <div className="flex gap-12" style={{ alignItems: "center", marginBottom: 16 }}>
                        <div className="icon-badge" style={{ marginBottom: 0, flex: "none" }}><VolunteerIcon /></div>
                        <div>
                          <div className="eyebrow" style={{ marginBottom: 0 }}>Volunteer Sign-Up</div>
                          <h3 className="h-sm" style={{ marginTop: 2 }}>Tell Us About Yourself</h3>
                        </div>
                      </div>
                      {error && <p className="form-error">{error}</p>}
                      <div className="form-grid">
                        <Field label="Full Name"><input required placeholder="Your name" value={volForm.fullName} onChange={setVol("fullName")} /></Field>
                        <Field label="Contact Number"><input required placeholder="+91" value={volForm.contactNumber} onChange={setVol("contactNumber")} /></Field>
                        <Field label="Email ID"><input type="email" required placeholder="you@email.com" value={volForm.email} onChange={setVol("email")} /></Field>
                        <Field label="City"><input placeholder="Chennai" value={volForm.city} onChange={setVol("city")} /></Field>
                        <Field label="Area Of Interest">
                          <select value={volForm.areaOfInterest} onChange={setVol("areaOfInterest")}>
                            <option value="">Select an area</option>
                            <option>People</option>
                            <option>Pets</option>
                            <option>Planet</option>
                            <option>Community Development</option>
                          </select>
                        </Field>
                        <Field label="Availability">
                          <select value={volForm.availability} onChange={setVol("availability")}>
                            <option value="">Select availability</option>
                            <option>Weekdays</option>
                            <option>Weekends</option>
                            <option>Flexible</option>
                          </select>
                        </Field>
                        <Field label="Message" opt full><textarea placeholder="Anything you'd like us to know" value={volForm.message} onChange={setVol("message")} /></Field>
                      </div>
                      <button type="submit" className="btn btn--primary mt-24" disabled={volSending}>{volSending ? "Sending…" : "Submit Interest"} <CheckIcon /></button>
                    </form>
                  )}
                </div>
              </Reveal>
            </Reveal>
          )}

          {careersOnly && tab === "career" && (
            <Reveal as="fade" id="career">
              <div className="impact-band mb-48" style={{ background: "var(--primary)" }}>
                <div className="impact-band__inner impact-band__inner--alt">
                  <div className="impact-band__title">
                    <div className="eyebrow">Why Work With Us</div>
                    <h3 className="h-md" style={{ color: "white" }}>Benefits</h3>
                  </div>
                  <div className="benefits-grid">
                    {CAREER_BENEFITS.map((b, i) => (
                      <div className="impact-stat" key={i} style={{ textAlign: "left", padding: "20px" }}>
                        <b.icon />
                        <b style={{ display: "block", color: "white", fontFamily: "var(--font-heading)", fontSize: "1.05rem", marginTop: 8 }}>{b.title}</b>
                        <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", marginTop: 4 }}>{b.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="center mb-32">
            <div className="tabbar mx-auto">
                  <button className={role === "seeker" ? "active" : ""} onClick={() => switchRole("seeker")}>For Job Seekers</button>
                  <button className={role === "employer" ? "active" : ""} onClick={() => switchRole("employer")}>For Employers</button>
                </div>
              </div>

              <Reveal as="up" key={role}>
                <div className="form-card">
                  {role === "seeker" && seekerSubmitted ? (
                    <SuccessNote onReset={resetSeeker} text="Thank you — your form has been submitted. ERGON's placement team will be in touch." />
                  ) : role === "employer" && employerSubmitted ? (
                    <SuccessNote onReset={resetEmployer} text="Thank you — your requirement has been submitted. ERGON's placement team will be in touch." />
                  ) : role === "seeker" ? (
                    <form onSubmit={submitSeeker}>
                      <div className="flex gap-12" style={{ alignItems: "center", marginBottom: 16 }}>
                        <div className="icon-badge" style={{ marginBottom: 0, flex: "none" }}><UsersGroupIcon /></div>
                        <div>
                          <h3 className="h-sm">Job Seeker Profile</h3>
                          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>Submit your details for placement assistance</p>
                        </div>
                      </div>
                      {error && <p className="form-error">{error}</p>}
                      <div className="form-grid">
                        <Field label="Full Name"><input required value={seekerForm.fullName} onChange={setSeeker("fullName")} /></Field>
                        <Field label="Date Of Birth"><input type="date" value={seekerForm.dob} onChange={setSeeker("dob")} /></Field>
                        <Field label="Gender">
                          <select value={seekerForm.gender} onChange={setSeeker("gender")}><option value="">Select</option><option>Female</option><option>Male</option><option>Other</option></select>
                        </Field>
                        <Field label="Educational Qualification"><input value={seekerForm.qualification} onChange={setSeeker("qualification")} /></Field>
                        <Field label="Address" opt full><input value={seekerForm.address} onChange={setSeeker("address")} /></Field>
                        <Field label="Contact Number"><input required value={seekerForm.contactNumber} onChange={setSeeker("contactNumber")} /></Field>
                        <Field label="Email ID"><input type="email" required value={seekerForm.email} onChange={setSeeker("email")} /></Field>
                        <Field label="Years Of Experience"><input placeholder="e.g. 2 years" value={seekerForm.experience} onChange={setSeeker("experience")} /></Field>
                        <Field label="Skills" opt full><input placeholder="Comma separated" value={seekerForm.skills} onChange={setSeeker("skills")} /></Field>
                        <Field label="Preferred Job Role"><input value={seekerForm.preferredRole} onChange={setSeeker("preferredRole")} /></Field>
                        <Field label="Preferred Industry"><input value={seekerForm.preferredIndustry} onChange={setSeeker("preferredIndustry")} /></Field>
                        <Field label="Preferred Location"><input value={seekerForm.preferredLocation} onChange={setSeeker("preferredLocation")} /></Field>
                        <Field label="Current CTC" opt><input value={seekerForm.currentCTC} onChange={setSeeker("currentCTC")} /></Field>
                        <Field label="Expected CTC" opt><input value={seekerForm.expectedCTC} onChange={setSeeker("expectedCTC")} /></Field>
                        <Field label="Notice Period" opt><input value={seekerForm.noticePeriod} onChange={setSeeker("noticePeriod")} /></Field>
                        <Field label="Languages Known" opt><input value={seekerForm.languages} onChange={setSeeker("languages")} /></Field>
                        <div className="field full">
                          <label>Resume / CV Upload</label>
                          <div className="file-drop" onClick={() => seekerFileRef.current?.click()} style={{ cursor: "pointer" }}>
                            <UploadIcon />
                            <div>{seekerFile ? seekerFile.name : "Drag & drop your resume, or click to browse (PDF, DOC)"}</div>
                          </div>
                          <input type="file" ref={seekerFileRef} accept=".pdf,.doc,.docx" style={{ display: "none" }} onChange={(e) => setSeekerFile(e.target.files[0])} />
                        </div>
                      </div>
                      <button type="submit" className="btn btn--primary mt-24" disabled={seekerSending}>{seekerSending ? "Sending…" : "Submit Profile"} <CheckIcon /></button>
                    </form>
                  ) : (
                    <form onSubmit={submitEmployer}>
                      <div className="flex gap-12" style={{ alignItems: "center", marginBottom: 16 }}>
                        <div className="icon-badge" style={{ marginBottom: 0, flex: "none" }}><BriefcaseIcon /></div>
                        <div>
                          <h3 className="h-sm">Employer Requirement</h3>
                          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>Share your manpower needs with ERGON</p>
                        </div>
                      </div>
                      {error && <p className="form-error">{error}</p>}
                      <div className="form-grid">
                        <Field label="Name Of The Organization"><input required value={employerForm.organization} onChange={setEmployer("organization")} /></Field>
                        <Field label="Contact Person"><input required value={employerForm.contactPerson} onChange={setEmployer("contactPerson")} /></Field>
                        <Field label="Designation"><input value={employerForm.designation} onChange={setEmployer("designation")} /></Field>
                        <Field label="Contact Number"><input required value={employerForm.contactNumber} onChange={setEmployer("contactNumber")} /></Field>
                        <Field label="Email ID"><input type="email" required value={employerForm.email} onChange={setEmployer("email")} /></Field>
                        <Field label="Industry Type"><input value={employerForm.industryType} onChange={setEmployer("industryType")} /></Field>
                        <Field label="Job Role Required"><input value={employerForm.jobRole} onChange={setEmployer("jobRole")} /></Field>
                        <Field label="Number Of Vacancies"><input type="number" min="1" value={employerForm.vacancies} onChange={setEmployer("vacancies")} /></Field>
                        <Field label="Qualification Required"><input value={employerForm.qualification} onChange={setEmployer("qualification")} /></Field>
                        <Field label="Experience Required"><input value={employerForm.experience} onChange={setEmployer("experience")} /></Field>
                        <Field label="Salary Range (CTC)"><input value={employerForm.salaryRange} onChange={setEmployer("salaryRange")} /></Field>
                        <Field label="Job Location"><input value={employerForm.jobLocation} onChange={setEmployer("jobLocation")} /></Field>
                        <Field label="Employment Type">
                          <select value={employerForm.employmentType} onChange={setEmployer("employmentType")}><option value="">Select</option><option>Full Time</option><option>Part Time</option><option>Internship</option></select>
                        </Field>
                        <Field label="Additional Expectations" opt full><textarea value={employerForm.expectations} onChange={setEmployer("expectations")} /></Field>
                        <div className="field full">
                          <label>Job Description Upload <span className="opt">(optional)</span></label>
                          <div className="file-drop" onClick={() => employerFileRef.current?.click()} style={{ cursor: "pointer" }}>
                            <UploadIcon />
                            <div>{employerFile ? employerFile.name : "Drag & drop the JD file, or click to browse"}</div>
                          </div>
                          <input type="file" ref={employerFileRef} accept=".pdf,.doc,.docx" style={{ display: "none" }} onChange={(e) => setEmployerFile(e.target.files[0])} />
                        </div>
                      </div>
                      <button type="submit" className="btn btn--primary mt-24" disabled={employerSending}>{employerSending ? "Sending…" : "Submit Requirement"} <CheckIcon /></button>
                    </form>
                  )}
                </div>
              </Reveal>
            </Reveal>
          )}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal as="scale">
            <div className="cta-banner">
              <div className="cta-banner__inner">
                <div className="eyebrow" style={{ color: "var(--gold-light)", justifyContent: "center" }}>Still Have Questions?</div>
                <h2 className="h-lg">We'd Love To Hear From You</h2>
                <p>Reach out to our team and we'll help you find the right way to get involved.</p>
                <div className="hero__cta">
                  <NavLink to="/contact" className="btn btn--gold btn--lg">Contact Us <ArrowRightIcon /></NavLink>
                  <NavLink to="/donate#payment-details" className="btn btn--white">Support Our Work <HeartHandsIcon /></NavLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
