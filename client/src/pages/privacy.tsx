import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animation';

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Drinking Buddy</title>
        <meta name="description" content="Read about Drinking Buddy's Privacy Policy. Learn how we collect, use, and protect your personal information." />
      </Helmet>
      
      <div className="bg-gradient-to-b from-primary/80 to-secondary/80 py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
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
              At Drinking Buddy, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, 
              and safeguard your information when you visit our website or use our mobile application.
            </p>
            
            <h2>Information We Collect</h2>
            
            <h3>Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you register for an account, 
              express interest in obtaining information about us or our products and services, participate in activities 
              on our platforms, or otherwise contact us. The personal information we collect may include:
            </p>
            <ul>
              <li>Name, email address, and contact details</li>
              <li>name and password</li>
              <li>Age and gender</li>
              <li>Profile pictures</li>
              <li>Personal preferences related to nightlife, music, and drinks</li>
              <li>Payment information (stored securely through our payment processors)</li>
            </ul>
            
            <h3>Automatically Collected Information</h3>
            <p>
              When you access our platforms, we may automatically collect certain information about your device and usage, 
              including:
            </p>
            <ul>
              <li>Device type, operating system, and browser information</li>
              <li>IP address and geographic location</li>
              <li>Time spent on our platforms and pages viewed</li>
              <li>Referral source</li>
              <li>App usage data and crash reports</li>
            </ul>
            
            <h2>How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul>
              <li>Create and manage your account</li>
              <li>Provide and maintain our services</li>
              <li>Connect you with potential drinking partners based on your preferences</li>
              <li>Recommend clubs and events that match your interests</li>
              <li>Process your transactions and send related information</li>
              <li>Send administrative information, updates, and promotional content</li>
              <li>Respond to your inquiries and provide customer service</li>
              <li>Protect our platforms from abuse and illegal activities</li>
              <li>Analyze usage patterns to improve our platforms and services</li>
            </ul>
            
            <h2>Sharing Your Information</h2>
            <p>We may share your information with third parties in the following situations:</p>
            <ul>
              <li><strong>Business Partners:</strong> We may share your information with our business partners to offer you certain products, services, or promotions.</li>
              <li><strong>Service Providers:</strong> We may share your information with service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, and hosting services.</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information where required by law or if we believe that such action is necessary to comply with a legal obligation.</li>
              <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with a merger, financing, acquisition, or dissolution transaction involving all or a portion of our business.</li>
            </ul>
            
            <h2>Your Privacy Choices</h2>
            <p>
              You have certain rights regarding your personal information, which may include the right to:
            </p>
            <ul>
              <li>Access and update your personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Disable location tracking features</li>
              <li>Adjust your privacy settings within the app</li>
            </ul>
            
            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal information. 
              However, please be aware that no method of transmission over the internet or electronic storage is 100% secure, 
              and we cannot guarantee absolute security.
            </p>
            
            <h2>International Data Transfers</h2>
            <p>
              Your information may be transferred to, and maintained on, computers located outside of your state, province, 
              country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction.
            </p>
            
            <h2>Children's Privacy</h2>
            <p>
              Our services are not directed to children under 18 years of age, and we do not knowingly collect personal 
              information from children under 18. If we learn we have collected or received personal information from a child 
              under 18, we will delete that information.
            </p>
            
            <h2>Changes to this Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy 
              periodically for any changes.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <p>
              Email: privacy@drinkingbuddie.com<br />
              Address: 123 Nightlife Avenue, New York, NY 10001
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
