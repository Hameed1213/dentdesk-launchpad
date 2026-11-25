import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Faq } from "@/components/site/templates";

/*
 * The text of the guide "How to switch dental practice software: a UK checklist", shown in the
 * guide layout (components/site/guideTemplate.tsx). General information, not legal advice.
 * Draft written 25 Nov 2026 for publishing on 27 Nov 2026.
 *
 * Sources read on 25 Nov 2026 (wording checked on the live pages):
 * - ICO "What needs to be included in the contract?" (controller/processor contracts): processing
 *   details incl. duration; at the controller's choice the processor deletes or returns the data at
 *   the end; backups may be put beyond use and deleted as soon as possible.
 * - UK GDPR Art. 28 on legislation.gov.uk: 28(1) "sufficient guarantees"; 28(3)(g) delete or return.
 * - NHS England Records Management Code of Practice, Appendix II retention schedule (care records),
 *   on digital.nhs.uk: "Dental records: clinical care records", 11 years ("changed from 15 years in
 *   May 2023 following legal advice"), "applies to all dental care settings". Page shows "Last
 *   edited: 20 May 2026". The transform.england.nhs.uk copy could not be reached, so not cited.
 * - GDC Standards for the Dental Team, principle 4: 4.1, 4.1.3 (follow national advice on
 *   retaining records), 4.4 (patients can access their records), 4.5 and 4.5.3 (back-up copies of
 *   computerised records, radiographs and images).
 * - NHSBSA "Dental activity processing" (WebEDI page): WebEDI sends data between the practice
 *   management system and NHS Dental Services; links a list of software system suppliers.
 * Not cited because they could not be read: DDU records guides (empty page), Dental Protection's
 * England record-keeping page (404). Children's record periods are therefore not stated as figures.
 *
 * DentDock facts checked read-only on 25 Nov 2026 (hub 63b6b60, website repo as of today):
 * - No NHS claims, UDAs or banding: dentdesk-launchpad src/routes/faq.tsx ("Does it work for mixed
 *   NHS and private practices?").
 * - Database and files in London, UK; nightly backup copies of files in Stockholm, Sweden:
 *   src/routes/features.security.tsx FAQ.
 * - Full export: one ZIP of spreadsheets plus every file and photo, owners and managers:
 *   desk-care-hub src/lib/practiceExport.ts; features.security.tsx FAQ.
 * - Return or delete within 90 days of the account closing, backups within a further 40 days:
 *   src/routes/dpa.tsx section 10.
 * - Two-step login required for owners and practice managers: desk-care-hub
 *   src/components/TwoStepReminder.tsx line 60; src/hooks/useTwoStepRequirement.ts.
 * - £49 a month per practice, unlimited dentists and staff, no setup fee, no contract:
 *   src/routes/pricing.tsx. 30-day free trial, once per practice: desk-care-hub
 *   supabase/functions/create-checkout-session/index.ts line 219.
 * - Patient import from a CSV with column matching and recall dates: desk-care-hub
 *   src/utils/patientImporter.ts (patients + recalls only); features.switching.tsx.
 *   Past appointments, payments and charts are not imported (features.switching.tsx FAQ).
 * - Due for deletion list (11 years since last treatment, or age 25 for children if later; nothing
 *   deleted until an owner or manager reviews): desk-care-hub src/pages/DueForDeletion.tsx.
 * NOT claimed: importing from any named system, importing upcoming appointments (the switching page
 * says DentDock staff bring them across, but the app has no appointment importer today), a setup
 * or go-live time, "compliant" or any certification, integrations, NHS claims, multi-site,
 * customers or results, competitor prices, anything about EXACT / Software of Excellence (no
 * official page was checked for a factual point, so the guide stays generic).
 */

export const SWITCHING_PATH = "/guides/switching-dental-software";
export const SWITCHING_TITLE = "How to switch dental practice software: a UK checklist";

const ICO_CONTRACT =
  "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/contracts-and-liabilities-between-controllers-and-processors-multi/what-needs-to-be-included-in-the-contract/";
const GDPR_28 = "https://www.legislation.gov.uk/eur/2016/679/article/28";
const NHS_RETENTION =
  "https://digital.nhs.uk/data-and-information/information-governance/guidance/records-management-code-of-practice/appendix-ii/retention-schedule-care-records";
const GDC_P4 = "https://standards.gdc-uk.org/pages/principle4/principle4.aspx";
const NHSBSA_WEBEDI = "https://www.nhsbsa.nhs.uk/fp17-processing-and-payments/webedi";

export const switchingFaq: Faq[] = [
  {
    question: "How long does it take to switch dental practice software?",
    answer:
      "Most of the time goes on planning, notice periods and checking your data, not on setting up the new system. Allow several weeks from signing to switching off the old system, and longer if your current contract has a notice period or your data export needs your supplier's help.",
  },
  {
    question: "Can we take our patient records with us when we change dental software?",
    answer:
      "You can usually get a patient list out as a spreadsheet, but what else comes out, and in what format, depends on the system. Ask your current supplier exactly what they can export, and ask the new supplier exactly what they can import. Plan to keep access to anything that doesn't move.",
  },
  {
    question: "How long do we need to keep records from our old system?",
    answer:
      "NHS England's Records Management Code of Practice lists 11 years for dental clinical care records, and says this applies to all dental care settings. Children's records and the rules in Scotland, Wales and Northern Ireland can differ, so check with your indemnity provider.",
  },
  {
    question: "Do NHS and mixed practices need special software?",
    answer:
      "Yes, for claims. NHS dental claims in England are sent from the practice's software to NHS Dental Services, and the NHSBSA lists the software suppliers that can send them. If you see NHS patients, check that any new system can submit your claims before you sign.",
  },
  {
    question: "Do we need a new data processing agreement when we switch?",
    answer:
      "Yes. Your new supplier will process patient data for you, so UK GDPR requires a written contract with set terms, including what happens to the data when the contract ends. Most suppliers publish one. Read it before you sign.",
  },
];

export const switchingSources = [
  { label: "ICO: What needs to be included in the contract?", url: ICO_CONTRACT },
  { label: "UK GDPR, Article 28: Processor", url: GDPR_28 },
  {
    label:
      "NHS England: Records Management Code of Practice, Appendix II retention schedule (care records)",
    url: NHS_RETENTION,
  },
  { label: "GDC: Standards for the Dental Team, Principle 4 (records)", url: GDC_P4 },
  { label: "NHSBSA: Dental activity processing (WebEDI)", url: NHSBSA_WEBEDI },
];

function H2({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="mt-14 text-[26px] md:text-[30px] font-semibold tracking-tight text-[#0F172A] leading-[1.25] scroll-mt-24"
    >
      {children}
    </h2>
  );
}

function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-8 text-[20px] font-semibold tracking-tight text-[#0F172A] leading-[1.35]">
      {children}
    </h3>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-[17px] text-[#334155] leading-[1.75]">{children}</p>;
}

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#2563EB] underline underline-offset-2 hover:text-[#1D4ED8]"
    >
      {children}
    </a>
  );
}

function L({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="text-[#2563EB] underline underline-offset-2 hover:text-[#1D4ED8]">
      {children}
    </Link>
  );
}

function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3 text-[17px] text-[#334155] leading-[1.7]">
          <span
            aria-hidden="true"
            className="mt-[12px] h-1.5 w-1.5 rounded-full flex-shrink-0 bg-[#0F172A]"
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/** A tick-box list for the supplier questions, printed or ticked off on screen. */
function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3 text-[17px] text-[#334155] leading-[1.7]">
          <span
            aria-hidden="true"
            className="mt-[6px] h-4 w-4 flex-shrink-0 rounded border border-[#94A3B8] bg-white"
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function B({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-[#0F172A]">{children}</strong>;
}

/** The move in stages: what happens and roughly when. */
function TimelineTable() {
  const rows: [string, string, string][] = [
    [
      "1. Decide",
      "1 to 3 months before",
      "Agree what isn't working, list must-haves, see two or three systems, check your current contract's notice period.",
    ],
    [
      "2. Contract",
      "Once you've chosen",
      "Read the terms and the data processing agreement. Give notice to your current supplier in the way the contract asks.",
    ],
    [
      "3. Data export",
      "2 to 4 weeks before go-live",
      "Ask your current supplier for exports. Check what's in them and what's missing.",
    ],
    [
      "4. Test import",
      "2 to 3 weeks before",
      "Import into the new system and check a sample of patients against the old one: names, dates of birth, contact details, medical alerts, recalls.",
    ],
    [
      "5. Set up and training",
      "1 to 2 weeks before",
      "Opening hours, treatments, prices, team and permissions. Every person who'll use it tries the tasks they do daily.",
    ],
    [
      "6. Go-live",
      "A quiet day",
      "Final import of anything booked since the test. New booking link live. Reminders switched on in the new system and off in the old.",
    ],
    [
      "7. Run both",
      "First 1 to 4 weeks",
      "New system is the only diary. Old system read-only, for looking things up.",
    ],
    [
      "8. Switch off",
      "When nothing new goes in the old one",
      "Final checks, then end the old subscription on the date your notice runs out.",
    ],
    [
      "9. Keep old access",
      "For as long as you must keep the records",
      "Read-only access, an archive or a full export you can open, kept securely.",
    ],
  ];
  return (
    <div className="mt-6 overflow-x-auto rounded-lg border border-[#E2E8F0]">
      <table className="w-full min-w-[560px] text-left text-[15px] leading-[1.5]">
        <caption className="sr-only">A timeline for switching dental practice software</caption>
        <thead className="bg-[#F8FAFC] text-[#0F172A]">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">
              Stage
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Roughly when
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              What to do
            </th>
          </tr>
        </thead>
        <tbody className="text-[#334155]">
          {rows.map(([a, b, c]) => (
            <tr key={a} className="border-t border-[#E2E8F0] align-top">
              <td className="px-4 py-3 font-medium text-[#0F172A] whitespace-nowrap">{a}</td>
              <td className="px-4 py-3">{b}</td>
              <td className="px-4 py-3">{c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** The guide's article text, from "The short answer" to the not-legal-advice note. */
export function SwitchingGuideBody() {
  return (
    <>
      <div>
        <p className="text-[16px] font-semibold text-[#0F172A]">The short answer</p>
        <p className="mt-3 text-[18px] text-[#0F172A] leading-[1.65]">
          Switch when your system holds the practice back and the gain is worth weeks of planning.
          Before you sign, ask every supplier where your data is stored, how you get it out, what
          the contract ties you to, and, if you see NHS patients, how claims are sent. Then move in
          planned stages and keep access to old records.
        </p>
      </div>

      <H2 id="when-to-switch">When is it worth switching dental software?</H2>
      <P>
        Changing practice software is a real project. Your diary, patient records and the way your
        practice team works all move at once, so it&rsquo;s worth being clear about why before you
        start. Common reasons include:
      </P>
      <List
        items={[
          "Your supplier is retiring the product you use, or moving customers to a different one, so you have to move anyway.",
          "Your contract is ending, and it's a natural point to look at what else is out there.",
          "The price has gone up, or the way you're charged (per user, per chair, per extra) no longer fits.",
          "Patients expect things your system doesn't do well, such as booking online or filling in forms before they arrive.",
          "Your team works around the software: double entry, paper forms, spreadsheets on the side.",
          "You're changing how you work, for example moving from NHS to private, and need different tools.",
        ]}
      />
      <P>
        It may not be worth switching if the problem is training, set-up or one missing feature
        your current supplier plans to add. Ask them first. A conversation is cheaper than a
        migration.
      </P>
      <P>
        Write down your must-haves before you look at any demo. Keep it short: the five or six
        things the practice can&rsquo;t run without, and the two or three problems you most want
        to fix. Then judge every system, including the one you have, against the same list.
      </P>

      <H2 id="what-to-ask">What should you ask any dental software supplier?</H2>
      <P>
        Demos show the best of a product. The questions below show how it will be to live with,
        and how easy it will be to leave. There&rsquo;s a full checklist{" "}
        <a href="#checklist" className="text-[#2563EB] underline underline-offset-2">
          further down
        </a>
        ; these are the areas that matter most.
      </P>

      <H3>Where is the data, and who looks after it?</H3>
      <P>
        Ask where the main database is held, where backups are kept, and which other companies
        (sub-processors) handle your data, such as email or text providers. Ask how often backups
        are taken, how long they&rsquo;re kept, and whether restoring from them has been tested.
        The <A href={GDC_P4}>GDC&rsquo;s standards</A> say that if records are computerised, you
        should make back-up copies of clinical records, radiographs and other images.
      </P>

      <H3>Is there a proper processor contract?</H3>
      <P>
        Your practice is the controller of its patient data. A software supplier that stores it for
        you is a processor. Under <A href={GDPR_28}>Article 28 of UK GDPR</A> you should only use
        processors that give &ldquo;sufficient guarantees&rdquo;, and the contract must include set
        terms. The <A href={ICO_CONTRACT}>ICO</A> lists them, including that at the end the
        processor must, at your choice, &ldquo;delete or return to the controller all the personal
        data it has been processing for it&rdquo;. Ask to read the data processing agreement before
        you sign, not after.
      </P>

      <H3>How do we leave?</H3>
      <P>
        The best time to plan your exit is before you join. Ask what you can export, in what format,
        whether you can do it yourself or have to ask, whether there&rsquo;s a charge, and how long
        you keep access after you cancel. These answers decide how hard your next switch will be.
      </P>

      <H3>Security for logins</H3>
      <P>
        Ask whether two-step login (a password plus a code from an app) is available, and whether
        it can be required for everyone who can see the whole practice. Ask whether each team member
        can be limited to the screens they need, whether idle sessions lock, and whether there&rsquo;s
        an activity log your practice can see.
      </P>

      <H3>Price and contract</H3>
      <P>
        Ask for the total monthly cost for your practice as it is today and as it might be in two
        years. Check what&rsquo;s charged separately: set-up, data migration, training, extra users
        or chairs, texts, card payments, support. Check the minimum term, the notice period and
        whether the price can change during the contract.
      </P>

      <H3>Support</H3>
      <P>
        Ask how you contact support, when it&rsquo;s open, and who you&rsquo;ll actually speak to.
        Ask what help you get during the move itself, which is when you&rsquo;ll need it most.
      </P>

      <H3>NHS claims, if you see NHS patients</H3>
      <P>
        This is a deciding question for NHS and mixed practices. In England, claims are sent from
        your practice management system to NHS Dental Services, and the{" "}
        <A href={NHSBSA_WEBEDI}>NHSBSA</A> publishes a list of the software suppliers that can send
        them. If you do NHS work, choose a system that handles your claims, or be sure you have
        another way to submit them. Some systems, DentDock included, are built for private practice
        and don&rsquo;t do NHS claims at all.
      </P>

      <H2 id="getting-your-data-out">How do you get your data out of your current system?</H2>
      <P>
        Start by asking your current supplier, in writing, what they can export and how. Exports
        differ a lot between systems: some let you download spreadsheets yourself, some send a file
        on request, and some data may only be viewable inside the old system. Don&rsquo;t assume;
        get the answer for your system and your contract.
      </P>
      <P>For most practices, this is what matters, roughly in order:</P>
      <List
        items={[
          <>
            <B>Patient details:</B> names, dates of birth, addresses, phone numbers, email, and any
            reference numbers. Almost every system can export these as a spreadsheet (CSV).
          </>,
          <>
            <B>Medical history and alerts:</B> allergies, conditions, medications and alerts. These
            matter for safety, so check them patient by patient in your test.
          </>,
          <>
            <B>Upcoming appointments:</B> without them your diary starts empty. Plan how they move,
            and who checks them.
          </>,
          <>
            <B>Recall dates:</B> so patients due a check-up aren&rsquo;t missed after the switch.
          </>,
          <>
            <B>Contact preferences:</B> who has opted out of texts or marketing. Bring these
            across so you don&rsquo;t message someone who said no.
          </>,
          <>
            <B>Clinical notes, charts and treatment plans:</B> often the hardest to move in a usable
            form. Many practices keep them in the old system or an export they can read.
          </>,
          <>
            <B>X-rays and photos:</B> these may sit in separate imaging software rather than the
            practice system. Find out where yours are before you plan.
          </>,
          <>
            <B>Money:</B> balances owed, payments and receipts. Agree a cut-off date with your
            accountant and carry over balances owed, not years of history.
          </>,
          <>
            <B>Forms, letters and documents:</B> signed consent forms, referral letters, scanned
            paperwork.
          </>,
        ]}
      />
      <P>
        Ask the new supplier the matching question: exactly what can you import, from what kind of
        file, and what can&rsquo;t you? The honest answer is rarely &ldquo;everything&rdquo;.
        Whatever doesn&rsquo;t move needs a plan of its own.
      </P>

      <H2 id="timeline">How long does a switch take?</H2>
      <P>
        Setting up a new system can be quick. The whole move takes longer, mostly because of notice
        periods, exports and checking. Every practice is different, but this is a sensible shape
        for the project:
      </P>
      <TimelineTable />
      <P>
        Pick a go-live day that&rsquo;s quieter than usual, and avoid the weeks around an
        inspection, a holiday or a team member&rsquo;s leave. During the run-both stage, decide which
        system is the only diary. Booking into two diaries at once is how double bookings happen.
      </P>
      <P>
        In the test import, check real patients, not just totals. Pick 20 or so, including children,
        patients with medical alerts and patients with unusual names or addresses, and compare each
        one side by side.
      </P>

      <H2 id="old-records">What happens to records in your old system?</H2>
      <P>
        You still have to keep patient records after you stop using a system. The{" "}
        <A href={GDC_P4}>GDC standards</A> say you must follow national advice on keeping, storing
        and disposing of records, and that patients have a right to access their records. In
        England, the <A href={NHS_RETENTION}>NHS Records Management Code of Practice</A> lists 11
        years for dental clinical care records (down from 15 years in May 2023) and says this
        applies to all dental care settings. Rules for children&rsquo;s records, and in Scotland,
        Wales and Northern Ireland, can differ, so check with your indemnity provider.
      </P>
      <P>That gives you three options for old records, and practices often use more than one:</P>
      <List
        items={[
          "Keep read-only access to the old system, if your supplier offers it. Ask what it costs and how long it lasts.",
          "Take a full export you can open without the old software, such as spreadsheets and image files, and store it securely.",
          "Bring the most-used parts into the new system, and keep the rest as above.",
        ]}
      />
      <P>
        Whatever you choose, ask for your data before your contract ends. Under{" "}
        <A href={GDPR_28}>Article 28</A> the processor has to delete or return your data at your
        choice once the service ends, so make that choice early and in writing.
      </P>

      <H2 id="telling-patients">How do you tell patients you&rsquo;ve changed systems?</H2>
      <P>
        Most patients won&rsquo;t notice a new system unless something they use changes. The
        things that usually do:
      </P>
      <List
        items={[
          <>
            <B>Your online booking link.</B> Update it everywhere on go-live day: your website,
            your Google Business Profile, social pages and email signatures.
          </>,
          <>
            <B>Reminders and recalls.</B> Switch them on in the new system and off in the old one
            on the same day, so patients don&rsquo;t get two of each, or none. The wording and the
            sender may look different, so a short note helps. Keep reminders factual; our{" "}
            <L to="/guides/reminder-texts-pecr">guide to texts and consent</L> explains why.
          </>,
          <>
            <B>Forms and portals.</B> If patients filled in forms or signed in to a portal in the
            old system, tell them where to go now.
          </>,
          <>
            <B>Your privacy notice.</B> Check it still describes who handles patient data and
            where. Update it if your new supplier changes that.
          </>,
        ]}
      />
      <P>
        A short message is enough: &ldquo;We&rsquo;ve moved to a new booking system. Your
        appointments haven&rsquo;t changed. To book or rearrange, use our new link: [link].&rdquo;
        Tell your practice team what to say if patients ring with questions.
      </P>

      <H2 id="checklist">Questions to ask any dental software supplier</H2>
      <P>Print this, or copy it into an email to each supplier you&rsquo;re considering.</P>
      <H3>Data and security</H3>
      <Checklist
        items={[
          "Where are the main database, files and backups held?",
          "Which other companies process our data, and where?",
          "How often are backups taken, how long are they kept, and are restores tested?",
          "Can we see your data processing agreement before we sign?",
          "Is two-step login available, and can we require it?",
          "Can we limit what each team member sees?",
          "Is there an activity log we can see?",
        ]}
      />
      <H3>Moving in</H3>
      <Checklist
        items={[
          "Exactly what can you import, and from what kind of file?",
          "What can't you import?",
          "Who does the import, and is there a charge?",
          "Can we do a test import and check it before go-live?",
          "How do upcoming appointments and recall dates come across?",
          "What help do we get during the move?",
        ]}
      />
      <H3>Moving out</H3>
      <Checklist
        items={[
          "What can we export, in what format, and can we do it ourselves?",
          "Is there a charge for exports or for leaving?",
          "How long do we keep access after we cancel?",
          "What happens to our data, including backups, after we leave?",
        ]}
      />
      <H3>Price and contract</H3>
      <Checklist
        items={[
          "What's the total monthly cost for our practice today, and in two years?",
          "What's charged separately: set-up, training, users, chairs, texts, payments?",
          "What's the minimum term and the notice period?",
          "Can the price change during the contract?",
        ]}
      />
      <H3>Clinical, NHS and support</H3>
      <Checklist
        items={[
          "If we see NHS patients, does the system submit our NHS claims?",
          "Does it do what our clinicians need: charting, treatment plans, medical history?",
          "How do we contact support, when, and who answers?",
          "Can we try it with our own team before we commit?",
        ]}
      />

      <H2 id="how-dentdock-helps">How DentDock helps</H2>
      <P>
        DentDock is practice software for UK private practices. Here&rsquo;s how it answers the
        questions above, including what it doesn&rsquo;t do:
      </P>
      <List
        items={[
          <>
            <B>No NHS claims.</B> DentDock doesn&rsquo;t do NHS claims, UDAs or banding. A mixed
            practice would still need its NHS system for claims.
          </>,
          <>
            <B>Where your data is.</B> The main database and files are in London, UK, with nightly
            backup copies of files in Stockholm, Sweden. See{" "}
            <L to="/features/security">security and data</L>.
          </>,
          <>
            <B>Getting out.</B> Owners and managers can download everything as one ZIP at any time:
            spreadsheets of your records plus every file and photo. Our{" "}
            <L to="/dpa">data processing agreement</L> is published, and says we return or delete
            your data within 90 days of your account closing.
          </>,
          <>
            <B>Logins.</B> Two-step login is required for owners and practice managers.
          </>,
          <>
            <B>Moving in.</B> You can import your patient list from a CSV file. DentDock matches the
            columns, you can change any match, and recall dates come across. Past appointment
            history, payments and charts aren&rsquo;t imported, so keep access to your old system
            for those.
          </>,
          <>
            <B>Price.</B> £49 a month per practice, with unlimited dentists and staff, no setup fee
            and no contract. See <L to="/pricing">pricing</L>.
          </>,
        ]}
      />
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          to="/features/switching"
          className="inline-flex items-center gap-1.5 text-[16px] font-semibold text-[#2563EB] underline underline-offset-4"
        >
          See switching to DentDock <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <H2 id="sources">Sources</H2>
      <ul className="mt-4 space-y-2">
        {switchingSources.map((s) => (
          <li key={s.url} className="text-[15px] leading-[1.6]">
            <A href={s.url}>{s.label}</A>
          </li>
        ))}
      </ul>
      <p className="mt-10 border-t border-[#E2E8F0] pt-5 text-[14px] text-[#64748B] leading-[1.6]">
        This guide is general information, not legal advice. Check contracts and records decisions
        with your indemnity provider or a solicitor before you rely on it.
      </p>
    </>
  );
}
