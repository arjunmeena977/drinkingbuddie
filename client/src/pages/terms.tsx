import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animation';

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions - Drinking buddie</title>
        <meta name="description" content="Read and understand the Terms & Conditions for using Drinking Buddy. Learn about your rights and responsibilities as a user." />
      </Helmet>
      
      <div className="bg-gradient-to-b from-primary/80 to-secondary/80 py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Terms & Conditions</h1>
            <p className="text-lg text-muted-foreground">
              Last Updated: July 1, 2023
            </p>
          </motion.div>
        </div>
      </div>
      
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            className="prose prose-invert prose-lg max-w-none"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <p>
              Welcome to Drinking Buddy. These Terms and Conditions govern your use of our website and mobile application, 
              and your relationship with Drinking Buddy. Please read these Terms carefully before using our services.
            </p>
            
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by these 
              Terms and Conditions. If you do not agree to these Terms, please do not use our services.
            </p>
            
            <h2>Eligibility</h2>
            <p>
              Our services are available only to individuals who are at least 21 years old (or the legal drinking age in your 
              jurisdiction, whichever is higher). By using our services, you represent and warrant that you meet the age 
              requirement and that you have the legal capacity to enter into these Terms.
            </p>
            
            <h2>User Accounts</h2>
            <p>
              To access certain features of our services, you must create an account. You are responsible for:
            </p>
            <ul>
              <li>Providing accurate and complete information during registration</li>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate your account if any information provided is inaccurate, out-of-date, 
              or violates these Terms.
            </p>
            
            <h2>User Conduct</h2>
            <p>
              When using our services, you agree not to:
            </p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Impersonate any person or entity or falsely state your affiliation with a person or entity</li>
              <li>Use our services to harass, abuse, or harm another person</li>
              <li>Upload or transmit viruses or malicious code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use our services to arrange illegal activities</li>
              <li>Interfere with or disrupt the integrity of our services</li>
              <li>Upload content that is offensive, inappropriate, or violates third-party rights</li>
              <li>Use our services to engage in commercial activities without our prior written consent</li>
            </ul>
            
            <h2>Drinking Buddy Matching Service</h2>
            <p>
              Our platform allows users to connect with potential drinking partners based on shared preferences and interests.
              We do not guarantee the behavior, compatibility, or safety of users you meet through our service. Please exercise 
              caution and common sense when interacting with other users:
            </p>
            <ul>
              <li>Meet in public places initially</li>
              <li>Inform someone you trust about your plans</li>
              <li>Arrange your own transportation</li>
              <li>Stay sober enough to make good decisions</li>
              <li>Report inappropriate behavior to us immediately</li>
            </ul>
            
            <h2>Intellectual Property</h2>
            <p>
              All content, features, and functionality available through our services, including but not limited to text, 
              graphics, logos, icons, images, audio clips, and software, are owned by Drinking Buddy or our licensors and 
              are protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              We grant you a limited, non-exclusive, non-transferable, and revocable license to use our services for their 
              intended purposes subject to these Terms.
            </p>
            
            <h2>User Content</h2>
            <p>
              By submitting, posting, or displaying content on or through our services, you grant us a worldwide, non-exclusive, 
              royalty-free license to use, reproduce, modify, adapt, publish, and display such content in connection with 
              providing and promoting our services.
            </p>
            <p>
              You represent and warrant that you own or have the necessary rights to submit your content and that your 
              content does not violate the rights of any third party.
            </p>
            
            <h2>Disclaimer of Warranties</h2>
            <p>
              OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, 
              INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND 
              NON-INFRINGEMENT.
            </p>
            <p>
              WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR 
              THAT OUR SERVICES OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
            </p>
            
            <h2>Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, DRINKING BUDDY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY 
              OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS 
              TO OR USE OF OR INABILITY TO ACCESS OR USE OUR SERVICES.
            </p>
            
            <h2>Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Drinking Buddy and its officers, directors, employees, agents, 
              and affiliates from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, 
              and expenses arising from your use of our services or your violation of these Terms.
            </p>
            
            <h2>Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting 
              the updated Terms on our platforms and updating the "Last Updated" date. Your continued use of our services after 
              such changes constitutes your acceptance of the new Terms.
            </p>
            
            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of New York, without 
              regard to its conflict of law provisions.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              Email: legal@drinkingbuddie.com<br />
              Address: 123 Nightlife Avenue, New York, NY 10001
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Terms;
