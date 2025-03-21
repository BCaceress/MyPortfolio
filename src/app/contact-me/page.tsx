"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Check, Loader2, Mail, RotateCcw, Send } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function ContactForm() {
  const { language } = useLanguage();
  // Recupera as traduções do idioma atual ou utiliza o inglês como fallback
  const rawContactText = (translations[language] || translations["en"]).contactForm;

  const contactText = {
    ...rawContactText,
    validation: rawContactText.validation || {
      nameRequired: "Nome é obrigatório",
      emailRequired: "Email válido é obrigatório",
      messageRequired: "Mensagem é obrigatória",
    },
    buttons: rawContactText.buttons || {
      sendEmail: "Enviar por Email",
      sendWhatsApp: "Enviar por WhatsApp",
      sending: "Enviando...",
    },
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loadingMethod, setLoadingMethod] = useState<"email" | "whatsapp" | null>(null);
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  // References for scroll animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  // Check if elements are in view
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });
  const isFormInView = useInView(formRef, { once: true, amount: 0.2 });
  const isCodeInView = useInView(codeRef, { once: true, amount: 0.2 });

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (formErrors[name as keyof typeof formErrors]) {
        setFormErrors((prev) => ({
          ...prev,
          [name]: false,
        }));
      }
    },
    [formErrors]
  );

  const validateForm = (method: "email" | "whatsapp") => {
    const errors = {
      name: !formData.name.trim(),
      message: !formData.message.trim(),
      email:
        method === "email"
          ? !formData.email.trim() || !isValidEmail(formData.email)
          : false,
    };

    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSend = useCallback(
    (method: "email" | "whatsapp") => {
      if (!validateForm(method)) {
        toast.error(
          method === "email"
            ? contactText.toast.fillAllFields
            : contactText.toast.nameMessageRequired,
          {
            duration: 3000,
            style: {
              background: '#F43F5E',
              color: '#fff',
              fontWeight: 500,
            },
            icon: '⚠️',
          }
        );
        return;
      }

      setLoadingMethod(method);

      setTimeout(() => {
        if (method === "email") {
          const subject = encodeURIComponent("Portfolio Contact");
          const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
          );
          window.location.href = `mailto:brunocaceres@live.com?subject=${subject}&body=${body}`;
          toast.success(contactText.toast.redirectingEmail, {
            icon: '📧',
            style: {
              background: '#10B981',
              color: '#fff',
              fontWeight: 500,
            },
          });
        } else if (method === "whatsapp") {
          const phone = "5551981927091";
          const text = encodeURIComponent(
            `Hello, my name is ${formData.name}. ${formData.message}`
          );
          window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
          toast.success(contactText.toast.openingWhatsApp, {
            icon: '💬',
            style: {
              background: '#10B981',
              color: '#fff',
              fontWeight: 500,
            },
          });
        }
        setLoadingMethod(null);
        setSubmitted(true);
      }, 1000);
    },
    [formData, contactText.toast]
  );

  const handleReset = useCallback(() => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    setFormErrors({
      name: false,
      email: false,
      message: false,
    });
  }, []);

  const formLabelAnimation = {
    initial: { y: -10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.4 }
  };

  const formInputAnimation = {
    initial: { x: -10, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.4, delay: 0.1 }
  };

  return (
    <div
      ref={sectionRef}
      id="contact"
      className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 py-20"
    >
      <Toaster position="top-center" />

      {/* Background decoration elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
      >
        <motion.div
          className="absolute top-40 -right-20 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl opacity-10 dark:opacity-5"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute bottom-40 -left-20 w-72 h-72 bg-emerald-300 rounded-full filter blur-3xl opacity-10 dark:opacity-5"
          style={{ y: y2 }}
        />

        {/* Grid pattern in the background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]"></div>

        {/* Decorative code elements */}
        <div className="absolute top-20 left-10 text-4xl text-gray-200 dark:text-gray-800 font-mono opacity-20 hidden lg:block">{'{'}</div>
        <div className="absolute bottom-20 right-10 text-4xl text-gray-200 dark:text-gray-800 font-mono opacity-20 hidden lg:block">{'}'}</div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header with animation */}
        <motion.header
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.span
            className="inline-block text-sm uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400 mb-2"
            initial={{ opacity: 0 }}
            animate={isTitleInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Get in Touch
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            <span className="text-blue-600 dark:text-blue-400 inline-block mr-3">{">"}</span>
            {contactText.title}
          </h2>

          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isTitleInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {contactText.subtitle}
          </motion.p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form Card */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="rounded-xl shadow-xl bg-white dark:bg-gray-800 overflow-hidden transition-all duration-300 transform hover:shadow-2xl"
          >
            <div className="p-6 md:p-8">
              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center text-center py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="bg-green-100 dark:bg-green-900/50 rounded-full p-5 mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  >
                    <Check className="h-14 w-14 text-green-600 dark:text-green-400" strokeWidth={1.5} />
                  </motion.div>

                  <motion.h3
                    className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {contactText.thankYou.title}
                  </motion.h3>

                  <motion.p
                    className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {contactText.thankYou.message}
                  </motion.p>

                  <motion.button
                    onClick={handleReset}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform hover:-translate-y-1"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={contactText.thankYou.newMessage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <RotateCcw size={18} />
                    {contactText.thankYou.newMessage}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  aria-label={contactText.title}
                >
                  {/* Form title */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      {language === "en" ? "Send a Message" : "Enviar uma Mensagem"}
                    </h3>
                    <div className="h-1 w-16 bg-blue-600 dark:bg-blue-500 rounded"></div>
                  </div>

                  <motion.div
                    variants={{
                      initial: { opacity: 0 },
                      animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
                    }}
                    initial="initial"
                    animate="animate"
                  >
                    {/* Name Field */}
                    <motion.div variants={formLabelAnimation} className="mb-6">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        {contactText.labels.name} <span className="text-red-500">*</span>
                      </label>
                      <motion.div variants={formInputAnimation} className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={contactText.placeholders.name}
                          className={`w-full p-3 pl-10 pr-4 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${formErrors.name
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300"
                            }`}
                          aria-required="true"
                          aria-invalid={formErrors.name}
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                          <span className="text-lg font-semibold">@</span>
                        </span>
                        {formErrors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1 text-sm text-red-500"
                            role="alert"
                          >
                            {contactText.validation.nameRequired}
                          </motion.p>
                        )}
                      </motion.div>
                    </motion.div>

                    {/* Email Field */}
                    <motion.div variants={formLabelAnimation} className="mb-6">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        {contactText.labels.email} <span className="text-red-500">*</span>
                      </label>
                      <motion.div variants={formInputAnimation} className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={contactText.placeholders.email}
                          className={`w-full p-3 pl-10 pr-4 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${formErrors.email
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300"
                            }`}
                          aria-required="true"
                          aria-invalid={formErrors.email}
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                          <Mail size={18} />
                        </span>
                        {formErrors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1 text-sm text-red-500"
                            role="alert"
                          >
                            {contactText.validation.emailRequired}
                          </motion.p>
                        )}
                      </motion.div>
                    </motion.div>

                    {/* Message Field */}
                    <motion.div variants={formLabelAnimation} className="mb-6">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        {contactText.labels.message} <span className="text-red-500">*</span>
                      </label>
                      <motion.div variants={formInputAnimation} className="relative">
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={contactText.placeholders.message}
                          rows={5}
                          className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${formErrors.message
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300"
                            }`}
                          aria-required="true"
                          aria-invalid={formErrors.message}
                        />
                        {formErrors.message && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1 text-sm text-red-500"
                            role="alert"
                          >
                            {contactText.validation.messageRequired}
                          </motion.p>
                        )}
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <motion.button
                      type="button"
                      onClick={() => handleSend("email")}
                      disabled={!!loadingMethod}
                      className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                      aria-label={contactText.buttons.sendEmail}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {loadingMethod === "email" ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          <span>{contactText.buttons.sending}</span>
                        </>
                      ) : (
                        <>
                          <Mail size={18} />
                          <span>{contactText.buttons.sendEmail}</span>
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => handleSend("whatsapp")}
                      disabled={!!loadingMethod}
                      className="flex items-center justify-center gap-2 py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                      aria-label={contactText.buttons.sendWhatsApp}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {loadingMethod === "whatsapp" ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          <span>{contactText.buttons.sending}</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>{contactText.buttons.sendWhatsApp}</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </div>
          </motion.div>

          {/* Code Visualization */}
          <motion.div
            ref={codeRef}
            initial={{ opacity: 0, x: 30 }}
            animate={isCodeInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="rounded-xl shadow-xl overflow-hidden transition-all duration-300 transform hover:shadow-2xl h-full bg-gray-900"
          >
            <div className="h-full flex flex-col">
              {/* IDE Header */}
              <div className="flex items-center px-4 py-3 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
                <div className="flex space-x-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <div className="ml-4 text-sm text-gray-400 flex items-center">
                  <span className="mr-2">📄</span>
                  <span className="font-mono">message.js</span>
                </div>
                <div className="ml-auto flex space-x-2">
                  <motion.button
                    className="text-gray-400 hover:text-gray-200 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <polyline points="9 21 3 21 3 15"></polyline>
                      <line x1="21" y1="3" x2="14" y2="10"></line>
                      <line x1="3" y1="21" x2="10" y2="14"></line>
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Code Content Area with Line Animation */}
              <div className="flex-1 bg-gray-900 dark:bg-gray-800 overflow-auto">
                <CodeBlock
                  formData={formData}
                  placeholders={contactText.placeholders}
                  isInView={isCodeInView}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Component to animate code appearing line by line
const CodeBlock = ({
  formData,
  placeholders,
  isInView
}: {
  formData: { name: string; email: string; message: string };
  placeholders: { name: string; email: string; message: string };
  isInView: boolean;
}) => {
  const codeLines = [
    { num: 1, content: <><span className="text-purple-400">const</span>{" "}<span className="text-blue-400">developerContact</span> = {"{"}</> },
    { num: 2, content: <><span className="text-gray-100 ml-4">client: {"{"}</span></> },
    {
      num: 3, content: <>
        <span className="text-gray-100 ml-8">name: </span>
        <span className="text-green-400">
          &quot;{formData.name || placeholders.name}&quot;
        </span>
        <span className="text-gray-100">,</span>
      </>
    },
    {
      num: 4, content: <>
        <span className="text-gray-100 ml-8">email: </span>
        <span className="text-green-400">
          &quot;{formData.email || placeholders.email}&quot;
        </span>
        <span className="text-gray-100">,</span>
      </>
    },
    {
      num: 5, content: <>
        <span className="text-gray-100 ml-8">timestamp: </span>
        <span className="text-orange-400">{new Date().toISOString()}</span>
      </>
    },
    { num: 6, content: <><span className="text-gray-100 ml-4">{"}"}, </span></> },
    { num: 7, content: <><span className="text-gray-100 ml-4">message: {"{"}</span></> },
    {
      num: 8, content: <>
        <span className="text-gray-100 ml-8">content: </span>
        <span className="text-green-400">
          &quot;{formData.message || placeholders.message}&quot;
        </span>
        <span className="text-gray-100">,</span>
      </>
    },
    { num: 9, content: <><span className="text-gray-100 ml-4">{"}"} </span></> },
    { num: 10, content: <><span className="text-gray-100">{"}"}</span><span className="text-gray-100">;</span></> },
    { num: 11, content: <><span className="text-gray-100"></span></> },
    {
      num: 12, content: <>
        <span className="text-purple-400">async function</span>{" "}
        <span className="text-yellow-400">sendMessage</span>
        <span className="text-gray-100">() {"{"}</span>
      </>
    },
    { num: 13, content: <><span className="text-gray-100 ml-4">try {"{"}</span></> },
    {
      num: 14, content: <>
        <span className="text-blue-300 ml-8">console</span>
        <span className="text-gray-100">.</span>
        <span className="text-blue-400">log</span>
        <span className="text-gray-100">(</span>
        <span className="text-yellow-400">&quot;Sending message...&quot;</span>
        <span className="text-gray-100">);</span>
      </>
    },
    {
      num: 15, content: <>
        <span className="text-gray-100 ml-8">const</span>{" "}
        <span className="text-blue-400">response</span>{" "}
        <span className="text-gray-100"> = </span>
        <span className="text-purple-400">await</span>{" "}
        <span className="text-blue-400">fetch</span>
        <span className="text-gray-100">(</span>
        <span className="text-yellow-400">&quot;/api/contact&quot;</span>
        <span className="text-gray-100">, {"{"}</span>
      </>
    },
    {
      num: 16, content: <>
        <span className="text-gray-100 ml-12">method: </span>
        <span className="text-yellow-400">&quot;POST&quot;</span>
        <span className="text-gray-100">,</span>
      </>
    },
    {
      num: 17, content: <>
        <span className="text-gray-100 ml-12">body: </span>
        <span className="text-blue-300">JSON</span>
        <span className="text-gray-100">.</span>
        <span className="text-blue-400">stringify</span>
        <span className="text-gray-100">(developerContact)</span>
      </>
    },
    { num: 18, content: <><span className="text-gray-100 ml-8">{"});"}</span></> },
    {
      num: 19, content: <>
        <span className="text-gray-100 ml-8">return </span>
        <span className="text-purple-400">await</span>{" "}
        <span className="text-blue-400">response</span>
        <span className="text-gray-100">.</span>
        <span className="text-blue-400">json</span>
        <span className="text-gray-100">();</span>
      </>
    },
    {
      num: 20, content: <>
        <span className="text-gray-100 ml-4">{"}"} </span>
        <span className="text-purple-400">catch</span>
        <span className="text-gray-100"> (</span>
        <span className="text-blue-400">error</span>
        <span className="text-gray-100">) {"{"}</span>
      </>
    },
    {
      num: 21, content: <>
        <span className="text-blue-300 ml-8">console</span>
        <span className="text-gray-100">.</span>
        <span className="text-red-400">error</span>
        <span className="text-gray-100">(</span>
        <span className="text-yellow-400">&quot;Error:&quot;</span>
        <span className="text-gray-100">, error);</span>
      </>
    },
    { num: 22, content: <><span className="text-gray-100 ml-4">{"}"}</span></> },
    { num: 23, content: <><span className="text-gray-100">{"}"}</span></> },
  ];

  return (
    <pre className="text-sm text-gray-100 p-5 font-mono leading-relaxed h-full">
      <code>
        {codeLines.map((line, index) => (
          <motion.div
            key={line.num}
            className="flex"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{
              duration: 0.4,
              delay: isInView ? 0.1 + (index * 0.03) : 0,
              ease: "easeOut"
            }}
          >
            <span className="text-gray-500 mr-4 select-none w-5 text-right">{line.num}</span>
            {line.content}
          </motion.div>
        ))}
      </code>
    </pre>
  );
};
