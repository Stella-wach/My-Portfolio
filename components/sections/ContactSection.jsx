import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { photographerInfo } from '@/data/photographer.js';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

// ─── EmailJS config ───────────────────────────────────────────
// 1. Sign up free at https://emailjs.com
// 2. Create a Gmail service → copy Service ID
// 3. Create an Email Template → copy Template ID
//    Template variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
// 4. Go to Account → API Keys → copy Public Key
// Then replace the three values below:
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
// ─────────────────────────────────────────────────────────────

const initialForm = { name: '', email: '', subject: '', message: '' };

function validate(f) {
  const e = {};
  if (!f.name.trim() || f.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
  if (!f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Enter a valid email address';
  if (!f.subject.trim()) e.subject = 'Subject is required';
  if (!f.message.trim() || f.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
  return e;
}

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(p => ({ ...p, [name]: true }));
    const fe = validate(formData);
    if (fe[name]) setErrors(p => ({ ...p, [name]: fe[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    const fe = validate(formData);
    if (Object.keys(fe).length > 0) { setErrors(fe); return; }

    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          reply_to: formData.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
      setFormData(initialForm);
      setErrors({});
      setTouched({});
    } catch (err) {
      toast({
        title: 'Failed to send',
        description: 'Please try again or email me directly at ' + photographerInfo.email,
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  const inputCls = (name) =>
    `w-full px-4 py-3 bg-secondary/50 border rounded-lg focus:outline-none focus:ring-2 text-foreground placeholder:text-muted-foreground transition-colors ${
      touched[name] && errors[name] ? 'border-red-500 focus:ring-red-500/50' : 'border-border focus:ring-primary/50'
    }`;

  return (
    <section ref={ref} className="py-20 md:py-24 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">Let's <span className="text-gradient-purple">Connect</span></h2>
          <p className="mt-3 text-muted-foreground text-lg">Have a project in mind? Let's bring your ideas to life!</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left — contact info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6">
            <h3 className="text-2xl font-bold">Get in Touch</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <Mail className="size-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Email</p>
                  <a href={`mailto:${photographerInfo.email}`} className="text-muted-foreground hover:text-primary transition-colors text-sm">{photographerInfo.email}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="size-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Phone</p>
                  <a href={`tel:${photographerInfo.phone}`} className="text-muted-foreground hover:text-primary transition-colors text-sm">{photographerInfo.phone}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="size-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Location</p>
                  <p className="text-muted-foreground text-sm">{photographerInfo.location}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <a href={photographerInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="size-5" /></a>
              <a href={photographerInfo.socialLinks.github} target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"><Github className="size-5" /></a>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }}>
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
                <CheckCircle className="size-14 text-green-500" />
                <h3 className="text-xl font-bold">Message Sent!</h3>
                <p className="text-muted-foreground text-sm">Thank you! I'll get back to you as soon as possible.</p>
                <button onClick={() => setSent(false)} className="mt-2 px-5 py-2 btn-gradient rounded-lg font-medium text-sm">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur}
                    className={inputCls('name')} placeholder="Your name" />
                  {touched.name && errors.name && (
                    <p className="flex items-center gap-1 text-xs text-red-500 mt-1"><AlertCircle className="size-3" />{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur}
                    className={inputCls('email')} placeholder="your@email.com" />
                  {touched.email && errors.email && (
                    <p className="flex items-center gap-1 text-xs text-red-500 mt-1"><AlertCircle className="size-3" />{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Subject *</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} onBlur={handleBlur}
                    className={inputCls('subject')} placeholder="Project inquiry" />
                  {touched.subject && errors.subject && (
                    <p className="flex items-center gap-1 text-xs text-red-500 mt-1"><AlertCircle className="size-3" />{errors.subject}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Message *</label>
                  <textarea name="message" rows={4} value={formData.message} onChange={handleChange} onBlur={handleBlur}
                    className={inputCls('message') + ' resize-none'} placeholder="Tell me about your project..." />
                  {touched.message && errors.message && (
                    <p className="flex items-center gap-1 text-xs text-red-500 mt-1"><AlertCircle className="size-3" />{errors.message}</p>
                  )}
                </div>
                <button type="submit" disabled={sending}
                  className="inline-flex items-center gap-2 px-6 py-3 btn-gradient rounded-lg font-medium disabled:opacity-50">
                  <Send className="size-4" /> {sending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
