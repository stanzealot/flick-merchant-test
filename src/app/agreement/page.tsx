'use client';

import Link from 'next/link';
import useGetMerchantKycDetails from '../api/hooks/customers/useGetMerchantKycDetails';
import { parseCookies } from 'nookies';
import { STORAGE_KEYS } from '@/src/utils/constants/api';
import { format } from 'date-fns';
import { addOrdinalSuffix } from '@/src/utils/functions';
import useUserDataStore from '@/src/utils/store/userStore';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTE_KEYS } from '@/src/utils/constants';
import useGetMerchantInfo from '../api/hooks/authentication/useGetMerchantInfo';
import CustomLoader from '@/src/components/blocks/custom-loader';

export default function AgreementPage() {
  const cookies = parseCookies();
  const router = useRouter();
  const merchantCode = cookies[STORAGE_KEYS.MERCHANT_CODE];
  const token = cookies[STORAGE_KEYS.AUTH_TOKEN];
  const { userData } = useUserDataStore();

  const { data, isLoading } = useGetMerchantKycDetails({
    CustomerCode: merchantCode,
    token,
  });

  const { isLoading: merchantLoading } = useGetMerchantInfo();

  // useEffect(() => {
  //   if (userData?.kycStatus !== 'completed') {
  //     router.push(ROUTE_KEYS.KYC_PENDING);
  //   }
  // }, [isLoading, merchantLoading, router, userData?.kycStatus]);

  if (isLoading || merchantLoading) return <CustomLoader />;

  return (
    <div className="mt-10 px-6 mx-auto max-w-[1200px]">
      <div className="text-center font-semibold">
        <h1 className="text-sm text-primary-500 font-medium">
          Current as of 20 Jan 2022
        </h1>
        <h1 className="text-[30px] text-[#1A1A1A] mt-2">
          Client Service Level Agreement
        </h1>
        <p className="text-[#666666] text-base font-light mt-3">
          Your privacy is important to us at Untitled. We respect your privacy
          regarding any information we may collect from you across our website.
        </p>
      </div>

      <div className="mt-20 mb-7 custom-scrollbar overflow-y-scroll">
        <div className="">
          <p className="text-sm text-[#666666] leading-8">
            This Merchant Services Agreement is made this{' '}
            <span className="font-semibold">
              {isLoading ? (
                <span>---</span>
              ) : (
                addOrdinalSuffix(
                  format(new Date(data?.data?.dateSigned || new Date()), 'dd')
                )
              )}
            </span>{' '}
            day of{' '}
            {/* <span className="font-semibold">
              {isLoading ? (
                <span>---</span>
              ) : (
                format(new Date(data?.data?.dateSigned || new Date()), 'MMMM, yyyy')
              )}
            </span>{' '} */}
            (“Effective Date”) between{' '}
            <span className="font-semibold">
              {isLoading ? <span>---</span> : data?.data?.business_name}
            </span>
            , a company registered in Nigeria, with its registered address at{' '}
            <span className="font-semibold">
              {isLoading ? <span>---</span> : data?.data?.address}
            </span>{' '}
            (“Merchant”) and QRABA Limited (Flick), a company registered in
            Nigeria, with its registered address at 6th Floor, Landmark Towers,
            5B, Water Corporation Road, Victoria Island, Lagos, Nigeria.
            (“Flick”).
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            Each of Flick and the Merchant is referred to as a
            &quot;Party&quot;; and both are referred to as the
            &quot;Parties&quot;.
          </p>
        </div>

        {/* GENERAL */}
        <section className="mt-14">
          <h1 className="text-[#1A1A1A] text-[20px] font-medium">1. General</h1>
          <p className="text-sm text-[#666666] leading-8 mt-3">
            1.1.  This Agreement sets out the basis on which Flick will provide
            to the Merchant, services including Account Information Service,
            Payment Initiation Service, derivative data solutions, professional
            service, and other features including but not limited to offline
            components as described in and ordered by Customer in accordance
            with this Agreement or as otherwise agreed by the Parties in writing
            from time to time (“Services”). This Agreement may be supplemented
            by specific terms approved and notified by Flick to the Merchant in
            writing from time to time.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            1.1.1 Flick is responsible for providing and being responsible for
            the cost of establishing and implementing the Service effectively in
            accordance with Schedule 1 of this Agreement. 
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            1.2. Flick may subcontract or delegate the performance of its
            obligations under this Agreement to third parties including any of
            its Affiliates and may, at its discretion, inform the Merchant.
            However, Flick shall remain responsible for the actions of the
            subcontractee or delegatee.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            1.3. The Agreement constitutes the entire agreement between the
            Parties in respect of the Services and supersedes any previous
            agreement, whether express or  implied.
          </p>
        </section>

        {/* Definitions and Interpretation */}
        <section className="mt-14">
          <h1 className="text-[#1A1A1A] text-[20px] font-medium">
            2.  Definitions and Interpretation
          </h1>
          <p className="text-sm text-[#666666] leading-8 mt-3">
            2.1.  In this Agreement:
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            “Acquirer” means a licensed commercial bank which is responsible for
            maintaining the Merchant Bank Account.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            &quot;Affiliate&quot; means, in relation to either Party, any entity
            in the same group as that Party, including but not limited to a
            subsidiary or a holding company of that Party and any direct or
            indirect subsidiaries of such holding company.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            “Agreement” means this Agreement, any Service supplements, including
            any appendices, amendments, modifications, extensions, and revisions
            to this  Agreement.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            &quot;Applicable Laws&quot; means all provisions of statues, laws,
            rules, codes, treaties, ordinances, directives, directions,
            injunctions, awards and/or regulations in the jurisdiction(s) of
            operation of either Party, including that from any court,
            governmental, intergovernmental or supranational authority, or
            self-regulatory organizations, and including requests, guidelines or
            decisions from regulators or associations as amended and re-enacted
            from time to time which are applicable to either of the Parties.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            &quot;Business Day&quot; means a day other than a Saturday or a
            Sunday on which banks are open for business in Ontario, Canada or a
            public holiday declared by the Government of Canada.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            &quot;Card Scheme&quot; includes MasterCard, Verve or Visa, and
            other similar schemes which govern the issue and use of any payment
            methods acceptable by Flick.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            &quot;Card Scheme Rules&quot; means any and all rules, regulations,
            standards, and operating guidelines issued by any Card Scheme, as
            amended and restated from time to time which are applicable to the
            Merchant.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            &quot;Chargeback&quot; means a circumstance where a Card Scheme or
            other financial institution requires repayment in respect of a
            transaction previously settled and/or remitted to the Merchant,
            notwithstanding that authorization may already have been obtained.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            &quot;Confidential Information&quot; means any and all written, oral
            visual, machine- readable or other tangible or intangible forms of
            information (whether patentable or copyrightable or not), data,
            techniques, plans, strategies, opportunities or trade secrets which
            is not generally available to the public as disclosed or delivered
            by either Party (the &quot;Disclosing Party&quot;) to the other
            Party (&quot;Receiving Party&quot;) whether before or after the
            Effective Date.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            &quot;Customer&quot; means a customer of the Merchant in relation to
            a payment transaction processed using the Services.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            &quot;Customer Data&quot; means data relating to Customers that (a)
            the Merchant provides to Flick in connection with the Services, or
            (b) Flick  generates on the basis of that data.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            &quot;Data&quot; means documents, records, and any other data of any
            kind relating to the transactions.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            &quot;Fees&quot; means all fees, charges and other payments to be
            made by the Merchant to Flick from time to time and more
            particularly set out in Schedule 2.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            &quot;Fines&quot; means any and all fines, levies, costs, expenses,
            charges, assessments or imposition of liabilities of any nature
            which the Card Schemes or other  financial institution require
            either the Merchant or Flick to pay or which are otherwise directly
            or indirectly recovered from Flick at any time and which relate to
            any aspect of this Agreement (including the provision of the
            Services hereunder).
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            &quot;Further Guidance&quot; means any and all internal or external
            documents, guidance, policies, and processes outlined or published
            by Flick in relation to the Services.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            &quot;Flick website&quot; means{' '}
            <Link href="https" className="!text-primary-500">
              www.getflick.co 
            </Link>
             
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            &quot;Payment&quot; means the relevant payment due to the Merchant
            from Flick on the Payment Date in respect of the transactions.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            &quot;Payment Date&quot; means (i) T+0 for local transactions; or
            (ii) T+ (max but would mostly be earlier) for foreign transactions.
          </p>
          <p className="text-sm text-[#666666] leading-8 mt-3">
            &quot;Refund&quot; means a return of an amount to a customer&apos;s
            account or the reversal of any other payment pursuant to a request
            or instruction from the Merchant to Flick.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            &quot;Services&quot; refers to the specific service(s) to be
            provided by Flick to the Partner, as further described in the Scope
            of Work contained in Schedule 1 of this Agreement.
          </p>
        </section>

        <section className="mt-14">
          <h1 className="text-[#1A1A1A] text-[20px] font-medium">
            3. Rights and Obligations of Flick - Flick Shall:
          </h1>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            3.1 In exchange for the Fees and the Merchant&apos;s compliance with
            the terms of this      Agreement, Flick  will provide the Services
            with reasonable skill and care, in accordance with this Agreement,
            Applicable Law, and for the duration of this Agreement.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            3.2  Grant the Customer, a non-exclusive, non-sublicensable,
            non-assignable licence to access and use the Flick Platform solely
            for the Customer’s business operations;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            3.3 Develop, oversee, and support APIs (Application Programming
            Interfaces) based on Customer requirements within the scope of this
            Agreement.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            3.4 Where the Merchant requires Flick to provide it with additional
            services beyond those contemplated at the Effective Date, the
            Merchant must submit a written request to Flick for such additional
            services, and Flick is not obligated to provide such additional
            services to the Merchant until it receives the Merchant&apos;s
            written request. Before onboarding the Merchant on such additional
            service, Flick may request additional documentation or require the
            Merchant to sign an addendum to this Agreement, notwithstanding
            anything to the contrary in this Agreement or elsewhere. Flick may,
            at its unilateral discretion and without explanation, deny such a
            request.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            3.5 If Flick, acting on its own initiative or at the request of a
            regulatory body, reasonably determines that it is necessary or
            desirable to terminate, suspend, or alter one, some, or all of the
            Services, it may do so immediately and without prior notice to the
            Merchant. When feasible, Flick will provide the Merchant 72 hours
            notice (not including weekends and holidays) before carrying out any
            such cancellation, suspension, or change.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            3.6 When a security breach, misuse, irregularity, suspected
            fraudulent transaction, or suspicious activity connected with
            attempts to commit fraud or other illegal activity carried out
            through or on the Customer&apos;s account on the Platform is
            discovered, the Customer is promptly notified, and corrective action
            is taken;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            3.7 While an authorised representative of the Customer &quot;clicks
            through&quot; or otherwise accepts or is made subject to any terms
            and conditions while utilising an electronically transmitted
            contract, any such terms and conditions are presumed agreed upon
            when the authorised representative clicks &quot;I Agree.&quot; The
            Customer enters into the Agreement and confirms that its authorised
            representatives have read, understood, and accepted these Terms by
            using the Services.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            3.8 Implement policies/practices in furtherance of its obligation
            under the Regulatory Framework for{' '}
            <strong>
              Financial Transactions and Reports Analysis Centre of Canada
              (FINTRAC)
            </strong>{' '}
            and the <strong>Operational Guidelines for Open Banking</strong> (or
            any amendments or modification to the same) (collectively{' '}
            <strong>“Open Banking Regulations”</strong>) as well as all other
            relevant regulatory and standards requirements.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            3.9 Comply with all applicable Anti Money Laundering/Combating the
            Financing of Terrorism, and any existing data protection laws and
            regulations of Canada
          </p>
        </section>

        <section className="mt-14">
          <h1 className="text-[#1A1A1A] text-[20px] font-medium">
            4. Payments, Fees, Charges
          </h1>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            4.1 Fees payable for Flick Services under this Agreement is further
            structured as provided in Schedule 2
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            4.2 Merchant shall be responsible for the direct processors fees
            from Payment Scheme which are already contained in the fees
            contained in clause 4.1 above
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            4.3 Flick reserves the right to increase/reduce/waive its
            transaction fees as provided in Schedule 2 from time to time without
            recourse to the Merchant but shall notify the Merchant of such
            increase/reduction/waiver immediately upon its implementation.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            4.4 Flick is entitled to recover and withhold:
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            4.4.1 any Refunds; and
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            4.4.2 any Chargebacks and any Fines from Visa, MasterCard, American
            Express and any Affiliates thereof or any other card payment
            network.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            4.5 The Merchant may markup fees to its Customers without recourse
            to Flick.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            4.6 The Merchant hereby gives Flick full permission and
            authorization to receive all settlements and collections on its
            behalf, from the Acquiring Bank, and to liaise with the Acquiring
            Bank, in order to make all due settlements to it, and on its behalf,
            through the Flick platform.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            4.7 If Flick has reasonable suspicion that a transaction may be
            fraudulent or involve other criminal activity, Flick may suspend the
            processing of that, and any connected transaction, or withhold
            Payment until the satisfactory completion of any investigation.
            Flick shall notify the Merchant that such transaction is withheld
            pending ongoing investigations.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            4.8 The Merchant shall not be entitled to any interest or other
            compensation whatsoever in respect to suspension or delay in
            receiving Payment.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            4.9 Flick reserves the right to change its fees provided that it
            shall notify the other Party in writing thirty (30) days prior to
            implementing such price review.
          </p>
        </section>

        <section className="mt-14">
          <h1 className="text-[#1A1A1A] text-[20px] font-medium">
            5. Rights and Obligations of The Merchant
          </h1>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            5.1 Create an account by registering on the Flick Dashboard and
            providing true, accurate, and complete information about the
            Customer and its use of the Service. The Customer shall be deemed to
            have honestly represented its identity, the legality of the
            Customer’s business undertakings and any other information provided
            in the creation of the Customer’s account.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            5.2 Integrate its Application with the Service using the SDK or any
            other installation/integration tools, or methods provided by Flick.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            5.3 Maintain Flick’s privacy-by-design protocols/controls on all
            APIs provisioned for the Customer;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            5.4 Implement processes and procedures to facilitate the prevention
            of unauthorised access to and use of the Service and shall notify
            Flick as soon as possible after the Customer becomes aware of any
            such unauthorised access and use;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            5.5 Deploy firewalls and virus protection programs to ensure that no
            malicious code, such as viruses, worms, time bombs, Trojan horses
            are uploaded to the Service;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            5.6 Pay the requisite fees for the Customer’s use of the Service;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            5.7 Comply with all technical requirements prescribed by Flick for
            the continued availability/use of the Service;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            5.8 Be responsible for conducting any know your customer (KYC)
            operations on its Users who have connected any of their financial
            accounts to the Service;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            5.9 Cooperate with Flick to ensure the interoperability of the
            Customer Application or environment with Flick’s Platform or
            Service;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            5.10 Do all such acts as may be necessary for the effective
            implementation of Flick’s APIs;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            5.11 Pay all applicable fees as Parties may agree under Schedule 2
            of this Agreement;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            5.12 Develop and manage internal fraud engine, Information Security
            Policies;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            5.13 Provide results of a third-party external Information Security
            assessment conducted upon request;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            5.14 Maintain incident response procedures;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            5.15 Provide End-User support with escalation procedures;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            5.16 Require contractors, subcontractors, vendors, outsourcing
            ventures, or other external third-party contractors to comply with
            above policies and agreements;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            5.17 Ensure that remote access to the Service and the Platform is
            only possible over secure connections;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            5.18 Have password-protected screen savers that activate
            automatically to prevent unauthorised access when idle, for
            computers used by all systems.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            5.19 Comply with all applicable Anti Money Laundering/Combating the
            Financing of Terrorism, and any existing data protection laws and
            regulations in Canada;
          </p>
        </section>

        <section className="mt-14">
          <h1 className="text-[#1A1A1A] text-[20px] font-medium">
            6. Representation and Warranties 
          </h1>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            6.1 Each Party represents and warrants, as of the Effective Date,
            that:
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            6.1.1 it has full power and authority to enter into, and perform its
            obligations under, this Agreement or any other contract that it will
            be required to enter into in connection with its obligations under
            Clause 3;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            6.1.2 there are no conditions, events, occurrences or other
            circumstances that might adversely affect its ability to carry out
            its obligations under this Agreement;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            6.1.3 there are no actions, suits or proceedings pending or, to its
            knowledge, threatened against or affecting it before any court or
            administrative body or arbitral tribunal that might materially
            adversely affect its ability to meet and carry out its obligations
            under this Agreement; 
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            6.1.4 the entry into and performance by it of its obligations under
            this Agreement do not and will not conflict with 
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            6.1.4 the entry into and performance by it of its obligations under
            this Agreement do not and will not conflict with 
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            6.1.4.1 any law or regulation applicable to it;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            6.1.4.2 its constitutional documents; or
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            6.1.4.3 any other agreement to which it is or will be bound for the
            duration of this Agreement.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            6.1.4.4 to the full extent permitted by applicable laws, except as
            expressly stated in this Agreement, the Parties negate any other
            representation or warranty written or oral, express, or implied,
            which are not contained in this Agreement.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            6.2  Nothing in this Agreement shall be construed as giving either
            Party ownership of the other Party’s intellectual property including
            but not limited to any software, trademarks, trade secrets.
          </p>
        </section>

        <section className="mt-14">
          <h1 className="text-[#1A1A1A] text-[20px] font-medium">
            7. Indemnity
          </h1>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            7.1 Unless the expense, liability, loss, claim, or proceeding
            results from the default, act, or omission of the non-defaulting
            Party, each Party shall be responsible for and shall indemnify the
            other Party in full against any and all direct expense, liability,
            loss, claim, or proceedings arising under statute or at common law
            due to any fraud or willful misconduct by the defaulting Party or
            its employees or agents.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            7.2 Whether or not the likelihood of such loss or damage was
            anticipated, neither Party shall be entitled to compensation from
            the other Party in connection with claims arising out of this
            Agreement or in any other way connected to the Service, whether in
            contract, in tort, under statute, or otherwise, for loss of profit,
            data, or goodwill, or for any other consequential, incidental,
            indirect, punitive, or special damages.
          </p>
        </section>

        <section className="mt-14">
          <h1 className="text-[#1A1A1A] text-[20px] font-medium">
            8. Assignment
          </h1>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            8.1 This Agreement is binding on and shall benefit both Parties, as
            well as their successors and assigns. Without the prior written
            approval of the other Party, neither party&apos;s rights or
            responsibilities under this Agreement may be assigned or otherwise
            transferred.
          </p>
        </section>

        <section className="mt-14">
          <h1 className="text-[#1A1A1A] text-[20px] font-medium">
            9. Confidentiality
          </h1>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            9.1 Each Party undertakes that it shall not at any time disclose to
            any person any Confidential Information disclosed to it by the other
            Party concerning the business affairs of the other Party or of any
            of its affiliate or related company, including information relating
            to a party’s operations, processes, plans, designs, trade secrets,
            market opportunities and customers and which:
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            9.1.1. at the time of coming to a Party’s knowledge is not already a
            part of the public domain;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            9.1.2. has not after coming to a Party’s knowledge, become part of
            the public domain through no fault of that Party; and
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            9.1.3. is not required to be disclosed for a proper purpose to any
            governmental,  regulatory or other public authority or to a court of
            law or other tribunal.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            9.2 Each Party may disclose the other Party’s Confidential
            Information:
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            9.2.1 to its employees, officers, agents, consultants or
            sub-contractors (“Representatives”) who need to know such
            information for the purposes of carrying out the Party’s obligations
            under this Agreement, provided that the Receiving Party takes all
            reasonable steps to ensure that its Representatives comply with the
            confidentiality obligations contained in this clause as though they
            were a party to this Agreement. The Receiving Party shall be
            responsible for its Representatives’ compliance with the
            confidentiality obligations set out in this clause. Such
            Representatives shall be under similar confidentiality obligations
            to the extent that this Agreement requires.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            9.2.2 as may be required by law, court order or any governmental or
            regulatory authority, provided that the Receiving Party shall to the
            extent permitted by Applicable Laws inform the Disclosing Party of
            the disclosure requirement prior to such disclosure.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            9.2.3 PROVIDED that the Disclosing Party under this clause shall
            subject to applicable laws;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            a. give to the other Party prompt written notice of the request and
            a reasonable opportunity to object to the disclosure and seek a
            protective order or appropriate remedy;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            b. disclose Confidential Information only to the extent required.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            9.3 Upon the termination of this Agreement, subject to applicable
            Data Retention Policies/Schedules, each Party shall immediately
            return to the other Party all papers, materials, data and other
            property of the other Party in its possession or held by it in
            connection with the performance of this Agreement. Notwithstanding
            the above, either Party shall be entitled to retain the other Party
            Confidential Information only to the extent required in terms of its
            reasonable retention of records policy or any Applicable Law,
            subject at all times to the confidentiality obligations as set out
            in this Clause.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            9.4 No Party shall publish, reproduce, circulate, or otherwise
            distribute or disclose any Confidential Information related to this
            Agreement without the express written consent of the Party that owns
            that piece of Confidential Information.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            9.5 Each Party’s Confidential Information shall only be used by the
            other Party in the performance of its obligations under this
            Agreement.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            9.6 Each Party agrees that it shall take all reasonable measures to
            protect the confidentiality of and avoid disclosure or use of
            Confidential Information of the other Party to prevent it from
            falling into the public domain or the possession of parties other
            than those authorised under this Agreement to have any such
            information. Each Party further undertakes to promptly notify the
            Disclosing Party in writing of any actual or suspected misuse,
            misappropriation, or unauthorised disclosure of the Receiving
            Party’s Confidential Information.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            9.7 The Parties agree that a breach of the confidentiality
            obligations contained in this Agreement may cause irreparable damage
            for which monetary damages cannot be an adequate relief, a Party is
            entitled to seek injunctive reliefs in addition to any other legal
            and monetary remedies that may be available to the affected Party.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            9.8 The Parties agree not to use any Confidential Information in any
            competitive form, either directly or indirectly.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            9.9 The confidentiality obligation imposed under this Agreement
            shall continue to bind the Parties after the termination or
            expiration of this Agreement.
          </p>
        </section>

        <section className="mt-14">
          <h1 className="text-[#1A1A1A] text-[20px] font-medium">
            10. Termination
          </h1>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            10.1 This Agreement shall be terminated:
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            10.1.1 Automatically, if by reason of withdrawal of any governmental
            authorization, licence or permit either Party is unable to fulfil
            its obligations herein stated;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            10.1.2 By Flick, upon thirty (30) days written notice to the
            Partner; or By either Party upon willful default by the other Party
            to perform any of its obligations under this Agreement if such
            default is not corrected within thirty (30) days after written
            notice by the non-defaulting party. 
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            10.2 Termination of this Agreement for any reason whatsoever shall
            however be without prejudice to any other claims or remedies accrued
            in favour of Flick prior to the effective date of termination and
            upon termination of this Agreement all amount and/or outstanding
            obligations owing to Flick in terms of this Agreement shall become
            immediately due and payable.
          </p>
        </section>

        <section className="mt-14">
          <h1 className="text-[#1A1A1A] text-[20px] font-medium">
            11. Severability
          </h1>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            If any term of this Agreement becomes unlawful, invalid, or
            unenforceable in any manner, the legality, validity, and
            enforceability of the other provisions shall not be impacted, and
            the remaining provisions shall continue in full force and effect.
          </p>
        </section>

        <section className="mt-14">
          <h1 className="text-[#1A1A1A] text-[20px] font-medium">
            12. Anti-Bribery and Corruption
          </h1>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            12.1 Flick has a zero-tolerance policy to bribery and corruption in
            all of its business operations, and the Partner agrees to discharge
            its responsibilities under this Agreement professionally, ethically,
            and with integrity. 
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            12.2 In connection with any performance under this Agreement,
            neither the Partner nor any officer, employee, subcontractor, or
            agent of the Partner will make any payment, or offer, promise, or
            authorise any payment of any money or other article of value to any
            official, employee, or representative of Flick, or to any person or
            entity doing business with Flick, in order to obtain or retain
            Flick&apos;s business, or to direct Flick&apos;s business to a third
            party, or to influence an official, employee, or representative of
            Flick, 
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            12.3 Flick will express any serious concerns about misconduct,
            malpractice, or unethical activity in connection with any
            performance under this Agreement at the earliest opportunity and in
            a proper manner. 
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            12.4 It is the Partner&apos;s responsibility to ensure that all of
            its employees, agents, and assigns are aware of this commitment and
            the necessary procedures to be followed.
          </p>
        </section>

        <section className="mt-14">
          <h1 className="text-[#1A1A1A] text-[20px] font-medium">
            13. Governing Law & Dispute Resolution
          </h1>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            13.1 This Agreement shall be governed by and construed in all
            respects in accordance with the laws of the Federal Republic of
            Nigeria.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            13.2 Any disagreement or claim arising out of or connected to this
            Agreement, including any dispute as to its construction, validity,
            interpretation, enforceability, or breach, shall be addressed by
            talks between the Parties&apos; designated representatives
            (&quot;Dispute&quot;). If the Parties are unable to settle the
            Dispute amicably, the Dispute shall be resolved through arbitration
            in Nigeria in accordance with the Arbitration and Conciliation Act,
            Cap. A18 Laws of the Federation of Nigeria, 2004, as amended or
            replaced from time to time, and which are applicable at the time of
            reference to arbitration and are deemed to be incorporated by
            reference in this clause. 
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            13.3 Any arbitral panel appointed pursuant to this clause (13)
            hereof shall be composed of three (3) arbitrators.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            13.4 The Parties shall each appoint an arbitrator within fourteen
            (14) working days of any Party giving notice of a disagreement. The
            two (2) arbitrators so appointed shall then appoint a third and
            presiding arbitrator at any time thereafter so long as they do so
            before any substantive hearing or forthwith if they are unable to
            agree on any matter relating to the arbitration, and if a Party
            fails to appoint an arbitrator within the period herein prescribed
            or the two (2) arbitrators appointed by the Parties are unable to
            agree on the third and presiding arbitrator within fourteen (14)
            business days of one c Individuals with legal and/or business
            backgrounds will be appointed as arbitrators. 
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            13.5 Nothing in this clause (13) prevents the Parties from
            consenting in writing to change these provisions to provide for the
            appointment of a lone arbitrator, provided that the appointee is a
            commercial transaction expert. 
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            13.6 The place of arbitration shall be Lagos, Nigeria and the
            language of the arbitration proceedings shall be English.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            13.7 The arbitral decision or award shall be final and binding on
            the Parties and enforceable in any court having jurisdiction over
            the Parties. 
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            13.8 The cost of arbitration proceedings shall be borne by the
            Parties in dispute as determined by the arbitrator(s).
          </p>
        </section>

        <section className="mt-14">
          <h1 className="text-[#1A1A1A] text-[20px] font-medium">
            14. MISCELLANEOUS
          </h1>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            14.1 Relationship of the Parties - Notwithstanding anything in this
            Agreement to the contrary, the relationship between the Parties
            hereto shall be a service provider - customer relationship for the
            only purpose of the business connection herein constituted. This
            Agreement does not create a partnership or joint venture between the
            Parties, nor does it make one Party an agent of the other.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            14.2 Waiver - Any delay, omission, or refusal to exercise any right
            or remedy provided for in this Agreement shall not be deemed a
            continuous waiver of such right or remedy.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            14.3 Taxes - Payment under this Agreement does not include taxes and
            the Customer shall pay all taxes applicable to payments between the
            Parties under this Agreement.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            14.4 Electronic Notices – Notices and other communications shall be
            delivered or furnished by using electronic transmission. All notices
            to either of the Parties given by electronic transmission   shall be
            effective if given by such electronic medium agreed by Party to whom
            the notice is given and shall be deemed given;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            14.4.1 if by facsimile telecommunication, when directed to a number
            at which the Customer has consented to receive notice;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            14.4.2 if by electronic mail, when directed to an electronic mail
            address at which the Customer has consented to receive notice;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            14.4.3 if by a posting on an electronic network, together with
            separate notice to the Customer of such specific posting, upon the
            later of such posting and the giving of such separate notice; and
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            14.4.4 if by another form of electronic transmission, when directed
            to the Customer.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            For purposes of this Agreement, “electronic transmission” means any
            form of communication, not directly involving the physical
            transmission of paper, that creates a record that may be retained,
            retrieved and reviewed by a recipient thereof, and that may be
            directly reproduced in paper form by such a recipient through an
            automated process.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            14.5 Force Majeure
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            14.5.1 Neither of the Parties shall be liable to each other for
            failure or delay in performance of an obligation or enjoy the
            Service under this Agreement attributable to a cause beyond its
            reasonable control (Force Majeure as defined below), including but
            not limited to:
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            14.5.2 Acts of nature such as earthquake, floods, tornadoes, fire,
            actions or inactions of government;
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            14.5.3 War, civil disturbance, insurrection, vandalism, sabotage,
            epidemics, pandemics,
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            14.5.4 Explosions, fires, destruction of machines, factories and any
            kind of installations,
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            14.5.5 Boycotts, strikes and lock-outs of all kinds, go-slows,
            occupation of factories and work stoppages,
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            14.5.6 Acts of authority; whether lawful or unlawful, apart from
            acts from which the Party seeking relief has assumed the risk under
            any other provisions of this agreement.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            14.5.7 The affected Party shall, within 5 (five) Business Days of
            such Force Majeure event, give written notice to the other Party of
            the Force Majeure event.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            The notice shall detail the event and its effect on the affected
            Party&apos;s ability to perform its obligations in terms of this
            Agreement.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            14.5.8 Where the Force Majeure is of such a nature that it will
            result in the impossibility of performance of the obligation in
            question, the other Party shall be entitled, on receipt of the
            notice of the Force Majeure, to terminate this Agreement on notice
            to the affected Party but shall not be entitled to recover any
            damages which it may suffer as a result of such termination.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            14.5.9 Where the Force Majeure is of such a nature that it will not
            result in the impossibility of performance of the obligation in
            question but will delay the performance thereof, the Affected Party
            shall be entitled to such extension of time in which to perform that
            obligation as may be reasonable in the circumstances, taking into
            account the interests of bothParties, provided that if such Force
            Majeure persists for a period above 30 (thirty)days, either Party
            shall be entitled, immediately on the expiry of such 30 (thirty) day
            period, to terminate this Agreement, and in such circumstances,
            neither Party shall be entitled to recover any damages which it may
            have suffered as a result of such premature termination.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            14.5.9 Where the Force Majeure is of such a nature that it will not
            result in the impossibility of performance of the obligation in
            question but will delay the performance thereof, the Affected Party
            shall be entitled to such extension of time in which to perform that
            obligation as may be reasonable in the circumstances, taking into
            account the interests of bothParties, provided that if such Force
            Majeure persists for a period above 30 (thirty)days, either Party
            shall be entitled, immediately on the expiry of such 30 (thirty) day
            period, to terminate this Agreement, and in such circumstances,
            neither Party shall be entitled to recover any damages which it may
            have suffered as a result of such premature termination.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            14.6 Entire Agreement - The Agreement is the complete, entire, final
            and exclusive agreement between the parties related to the subject
            matter hereof and supersedes all prior agreements between the
            parties related to the subject matter hereof. The Agreement may not
            be modified except in a writing executed by the Parties.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            14.7 Survival - Any sections intended to survive termination or
            expiration of this Agreement will survive the termination or
            expiration of this Agreement.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            14.8 Territory - The Agreement shall be applicable within Nigeria
            and any other country of the Party’s choice, which Parties may agree
            on from time to time. It is however understood that parties may
            propose terms governing its relationship under a separate Agreement
            between the Parties.
          </p>

          <p className="text-sm text-[#666666] leading-8 mt-3">
            14.9 Amendments - This Agreement shall not be amended, except by an
            instrument in writing, executed by the Parties.
          </p>
        </section>

        <section className="mt-20">
          <h1 className="text-center font-semibold text-[20px]">
            SCHEDULE 1 – SCOPE OF WORK
          </h1>{' '}
          <div>
            <p className="text-sm text-[#666666] leading-8 mt-3">
              <strong> A. Service Catalog</strong>
            </p>
            <p className="text-sm text-[#666666] leading-8 mt-3">
              Flick will provide the following services to the Partner: 
            </p>
            <p className="text-sm text-[#666666] leading-8 mt-3">
              1. allow businesses access financial and identity data from
              customers’ bank accounts real-time. The data includes bank
              statements, transactions, balances, income, and Identity. 
              <br /> 2. facilitate businesses to collect one time or recurring
              payments their profiled customers or initiate payments to profiled
              vendors, employees, suppliers .etc.
              <br />
              3. convert funds collected on behalf of the merchant and settle
              swapped currencies directly in merchants designated bank accounts
            </p>
          </div>
          <div>
            <p className="text-sm text-[#666666] leading-8 mt-3">
              <strong> B. Service Availability </strong>
            </p>
            <p className="text-sm text-[#666666] leading-8 mt-3">
              Flick shall provide the Service via:
            </p>
            <p className="text-sm text-[#666666] leading-8 mt-3">
              1. Email through a dedicated support email account,
              [support@getflick.app] from 9:00am to 5:00pm on business days; and
              Flick warrants that the Service shall have an uptime of at least
              99% (ninety-nine percent) and that any downtime shall be suitably
              resolved within a maximum of 24 (twenty-four) hours from receipt
              of a formal complaint by the Partner by email or such other
              means. 
            </p>
          </div>
          <div>
            <p className="text-sm text-[#666666] leading-8 mt-3">
              <strong> C. Performance Tracking and Reporting  </strong>
            </p>
            <p className="text-sm text-[#666666] leading-8 mt-3">
              Flick shall provide the Service via:
            </p>

            <p className="text-sm text-[#666666] leading-8 mt-3">
              1. Key Personnel Changes  <br />
              2. Each Party shall notify the other Party in writing of any
              change in key personnel that will affect the delivery of the
              Service. The notification, along with a succession plan, shall be
              communicated 1 (one) week before the commencement of the change in
              key personnel.  <br />
              3. Service Level Requirements   <br />
              4. Flick shall adhere to the underlisted requirements:   <br />
              <ul className="">
                <li>
                  •Monitor and escalate all incidents according to agreed
                  service levels.
                </li>
                <li>
                  •Provide dedicated Partner Operations and Support Team. 
                </li>
                <li>
                  •Drive TAT for report generation reduction and resolution in a
                  focused manner, thus enhancing user productivity and
                  satisfaction. 
                </li>
                <li>
                  •Ensure detailed, accurate and current logging of incidents
                  raised and update the same in a timely manner when there are
                  changes. 
                </li>
                <li>
                  • Proactive identification and resolution of any likely issues
                  that may lead to downtime or impact provision of the Service. 
                </li>
                <li>
                  • Resolving incidents and requests relating to agreed
                  services, enduring smooth availability and timely service
                  provisioning. 
                </li>
              </ul>
            </p>
          </div>
        </section>

        <section className="mt-20">
          <p className="text-sm text-[#666666] leading-8 mt-3">
            3. Severity Definition, Response Times, and Resolution Times
          </p>
          <table className="border">
            <thead className="">
              <tr className="py-5 bg-black text-white">
                <th className="text-[15px] font-medium px-5 py-5">CATEGORY</th>
                <th className="text-[15px] font-medium px-5 py-5">
                  DESCRIPTION
                </th>
                <th className="text-[15px] font-medium px-5 py-3">
                  CONTACT INFORMATION FOR ESCALATION
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border text-center">
                <td className="text-sm text-[#666666] leading-8 mt-3 border px-5 py-3">
                  High
                </td>
                <td className="text-sm text-[#666666] leading-8 mt-3 border px-5 py-3">
                  Critical Business Impact – Fault incidence that has a material
                  impact on customer service, revenue, and production
                </td>
                <td className="text-sm text-[#666666] leading-8 mt-3 border px-5 py-3">
                  If {'>'} 8 (eight) hours, contact:  support@getflick.app
                </td>
              </tr>

              <tr className="border text-center">
                <td className="text-sm text-[#666666] leading-8 mt-3 border px-5 py-3">
                  Medium
                </td>
                <td className="text-sm text-[#666666] leading-8 mt-3 border px-5 py-3">
                  Significant Business Impact - Fault incidence that has a major
                  impact on customer service, revenue, and production
                </td>
                <td className="text-sm text-[#666666] leading-8 mt-3 border px-5 py-3">
                  If {'>'} 12 (twelve) hours, contact:  support@getflick.app
                </td>
              </tr>

              <tr className="border text-center">
                <td className="text-sm text-[#666666] leading-8 mt-3 border px-5 py-3">
                  Low
                </td>
                <td className="text-sm text-[#666666] leading-8 mt-3 border px-5 py-3">
                  Some Business Impact - Fault incidence that has a minor impact
                  on customer service, revenue, and production
                </td>
                <td className="text-sm text-[#666666] leading-8 mt-3 border px-5 py-3">
                  If {'>'} 48 (forty-eight) hours, contact: hello@getflick.app
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="mt-20">
          <h1 className="text-center font-semibold text-[20px]">
            {' '}
            SCHEDULE 2 – Product Pricing
          </h1>{' '}
          <p className="text-sm text-[#666666] leading-8 mt-3">
            {' '}
            <Link
              target="_blanck"
              href="https://getflick.co/pricing"
              className="!text-primary-600 !font-semibold"
            >
              https://getflick.co/pricing
            </Link>{' '}
            or as agreed in updated pricing schedule document signed by merchant
          </p>
        </section>

        <section className="mt-20">
          <h1 className="text-center font-semibold text-[20px]">
            {' '}
            SCHEDULE 3 - RESTRICTED INDUSTRIES / BUSINESSES
          </h1>{' '}
          <p className="text-sm text-[#666666] leading-8 mt-3">
            {' '}
            List of Customers/Businesses not served
          </p>
          <p className="text-sm text-[#666666] leading-8 mt-3">
            • Any activity which would violate any law, statute, ordinance,
            regulation, or sanctions programs applicable in the countries where
            Flick and its third party partners conduct business, including but
            not limited to the Financial Transactions and Reports Analysis
            Centre of Canada (FINTRAC);
          </p>
          <p className="text-sm text-[#666666] leading-8 mt-3">
            • Utilising identities that cannot be verified, applying anonymously
            or under fictitious names, and/or having accounts that do not
            identify the owners or stock certificates held in accounts without
            an owner endorsed to the &quot;bearer&quot;;
          </p>
          <p className="text-sm text-[#666666] leading-8 mt-3">
            • Any activity where there is a suspicion or evidence that criminal
            activity has taken place, a criminal offence has been committed, or
            where there is a suspicion of terrorist financing;
          </p>
          <p className="text-sm text-[#666666] leading-8 mt-3">
            • Any activity involving the use of shell banks (entities that have
            no physical existence in the country in which it is incorporated and
            licensed) or banks with no physical presence in any country that are
            not licensed by any banking authority;
          </p>
          <p className="text-sm text-[#666666] leading-8 mt-3">
            • Unlicensed Money Services Businesses (e.g., money/currency
            exchange, money transfer, cheque cashing, travelers cheques, money
            orders or stored value cards that meet the regulatory definition);
          </p>
          <p className="text-sm text-[#666666] leading-8 mt-3">
            • Any activity that involves any gambling, bet, wager, lottery,
            sweepstakes, or game of chance which is unlawful under applicable
            law, including the development of gambling software or hosting
            environments
          </p>
          <p className="text-sm text-[#666666] leading-8 mt-3">
            • High risk and high interest rate loans and/or payday loans;
          </p>
          <p className="text-sm text-[#666666] leading-8 mt-3">
            • Missions, embassies and consulates;
          </p>
          <p className="text-sm text-[#666666] leading-8 mt-3">
            • Marijuana-related activities, including medical marijuana, such as
            manufacturing, dispensing, transporting, and/or otherwise deriving
            revenue from marijuana-related activity;
          </p>
          <p className="text-sm text-[#666666] leading-8 mt-3">
            • Sexually-related services including escorts, prostitution, adult
            entertainment, pornography (child or adult), obscene media
            companies, and other sexually related online services such as adult
            live chats, sexually motivated dating services, and pornographic pay
            per view services;
          </p>
          <p className="text-sm text-[#666666] leading-8 mt-3">
            • Illicit drugs trafficking, drug paraphernalia manufacturing, or
            illicit drug distribution, including providing tools or services to
            aid in illicit drug trafficking or distribution;
          </p>
          <p className="text-sm text-[#666666] leading-8 mt-3">
            • Production, sale, or distribution of Schedule I controlled
            substances with or without a pharmaceutical licence, or sale of
            Schedules II-V controlled substances without a pharmaceutical
            licence, 
          </p>
          <p className="text-sm text-[#666666] leading-8 mt-3">
            • Business models indicative of a ponzi scheme, pyramid selling,
            pump and dump schemes, or other forms of “get rich quick,” unfair,
            or deceptive business models;
          </p>
          <p className="text-sm text-[#666666] leading-8 mt-3">
            • Promoting, supporting, or perpetuating terrorism, hate, bigotry,
            racism, abuse, harassment, discrimination, violence, or physical
            harm against any group based on race, religion, disability, gender,
            sexual orientation, gender identity, national origin, immigration
            status, any immutable characteristic, or any legally protected
            characteristic under state or federal law;
          </p>
          <p className="text-sm text-[#666666] leading-8 mt-3">
            • The production, sale, distribution, trading or manufacturing of
            guns, firearms, other weapons, ammunition, or explosive devices;
          </p>
          <p className="text-sm text-[#666666] leading-8 mt-3">
            • Sale of non-anonymized and non-aggregated consumer data;
          </p>
          <p className="text-sm text-[#666666] leading-8 mt-3">
            • Manufacturing of counterfeit goods or goods meant to infringe on
            intellectual property rights;
          </p>
          <p className="text-sm text-[#666666] leading-8 mt-3">
            • Trade, sale, or distribution of illegal products or products or
            services that are imported or exported illegally; and
          </p>
          <p className="text-sm text-[#666666] leading-8 mt-3">
            • Activities involving pseudo-medical and pseudo-pharmaceutical
            companies
          </p>
        </section>

        <div>
          <div className="mt-10 border border-[#EAECF0] border-x-0 py-5">
            <h1 className="text-base text-[#1A1A1A] font-medium">
              The effective date of this Agreement is the date of the
              e-signature last affixed to this page.
            </h1>
            <p className="text-[#9E9E9E] text-[13px]">
              E-signed by a duly authorized officer of MERCHANT:{' '}
            </p>
          </div>

          <div className="grid grid-cols-2 pr-5">
            <div className="mt-3 w-96 text-center">
              <div className="relative">
                {/* <input
                  type="text"
                  {...register('authorizerName')}
                  className="w-full outline-none border-2 border-dashed border-t-0 border-x-0 border-[#666666] text-[#1A1A1A] text-center font-medium pb-2"
                />
                {errors.authorizerName && (
                  <p className="text-[10px] absolute bottom-[-14px] text-danger-500">
                    {errors.authorizerName.message}
                  </p>
                )} */}
              </div>
              <p className="text-[#9E9E9E] text-[13px] mt-2 text-center">
                Name
              </p>
            </div>

            <div className="mt-3 w-96 text-center mr-0 ml-auto">
              <div className="relative">
                {/* <input
                  type="date"
                  {...register('dateSigned')}
                  value={new Date().toISOString().split('T')[0]}
                  className="w-full outline-none border-2 border-dashed border-t-0 border-x-0 border-[#666666] text-[#1A1A1A] text-center font-medium pb-2"
                /> */}
              </div>

              <p className="text-[#9E9E9E] text-[13px] mt-2 text-center">
                Date
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 pr-5 mt-14">
            <div className="relative">
              {/* <button
                onClick={(e) => {
                  e.preventDefault();
                  setOpenSignature(true);
                }}
                className="mt-3 w-96 text-center"
              >
                <div
                  className={`${
                    preview ? '' : 'h-[45px] bg-gray-100'
                  } relative cursor-pointer flex flex-col items-center justify-center w-full outline-none border-2 border-dashed border-t-0 border-x-0 border-[#666666] text-[#1A1A1A] text-center font-medium pb-2`}
                >
                  {preview ? (
                    <div className="w-20 h-20 absolute top-[-70px]">
                      <Image
                        width={1000}
                        height={1000}
                        src={preview}
                        alt="Preview"
                        className={`
                            ${
                              signatureType === 'draw' ? 'object-contain' : 'object-cover'
                            } w-full h-full rounded-md mb-4`}
                      />
                    </div>
                  ) : signature.length > 0 ? (
                    <p
                      className={`${selectedFont} ${signature !== 'Enter signature' && 'text-2xl'}`}
                    >
                      {signature}
                    </p>
                  ) : (
                    <p>Click here to sign document</p>
                  )}
                </div>
                <p className="text-[#9E9E9E] text-[13px] mt-2 text-center">Signature</p>
              </button> */}
            </div>

            <div className="mt-3 w-96 text-center mr-0 ml-auto">
              <div className="relative">
                {/* <input
                  type="text"
                  {...register('authorizerDesignation')}
                  className="w-full outline-none border-2 border-dashed border-t-0 border-x-0 border-[#666666] text-[#1A1A1A] text-center font-medium pb-2"
                />
                {errors.authorizerDesignation && (
                  <p className="text-[10px] absolute bottom-[-14px] text-danger-500">
                    {errors.authorizerDesignation.message}
                  </p>
                )} */}
              </div>
              <p className="text-[#9E9E9E] text-[13px] mt-2 text-center">
                Designation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
