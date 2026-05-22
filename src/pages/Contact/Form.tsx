import React, { useState } from "react";

interface FormProps {
  onClose: () => void;
}

export default function Form({ onClose }: FormProps) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("test_url", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="relative top-16 w-full py-4 text-white rounded-lg shadow-xl">
      {/* Bouton de fermeture */}
      <button
        onClick={onClose}
        className="absolute top-6 right-0 z-50 flex items-center justify-center w-10 h-10 bg-white text-black rounded-2xl hover:bg-gray-300 transition-colors shadow-lg"
        aria-label="Fermer le formulaire"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <h2 className="text-lg md:text-3xl font-bold mb-6 tracking-[-0.02em] font-fujiwara-light-italic w-1/2 lg:w-4/5">
        Parlez-nous de votre projet, de votre vision, de vos ambitions.
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full font-fujiwara"
      >
        {/* Champ Nom / Entreprise */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            hidden
            className="text-sm font-medium text-gray-300"
          >
            Nom ou Entreprise
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full p-3 bg-[#FAFAF5] text-black focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
            placeholder="Comment devons-nous vous appeler ?"
          />
        </div>

        {/* Champ Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            hidden
            className="text-sm font-medium text-gray-300"
          >
            Adresse email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full p-3 bg-[#FAFAF5] text-black focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
            placeholder="votre@email.com"
          />
        </div>

        {/* Champ Message */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            hidden
            className="text-sm font-medium text-gray-300"
          >
            Votre vision
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full p-3 bg-[#FAFAF5] text-black focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors resize-none"
            placeholder="Décrivez-nous les ambitions de votre marque et le récit que vous souhaitez créer..."
          />
        </div>

        {/* Bouton d'envoie */}
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full lg:w-1/2 mt-4 py-4 px-8 bg-white text-black font-bold uppercase hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-fujiwara-black-italic"
        >
          {status === "sending" ? "Envoi en cours..." : "Envoyer"}
        </button>

        {/* Messages de retour */}
        {status === "success" && (
          <p className="text-green-400 text-left mt-2">
            Votre message a bien été envoyé. Nous reviendrons vers vous très
            vite.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-left mt-2">
            Une erreur est survenue lors de l'envoi. Veuillez réessayer.
          </p>
        )}
      </form>
    </div>
  );
}
