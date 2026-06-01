/* ============================================================
   KARLA TAVARES — ADVOCACIA TRABALHISTA
   Interações: header, menu mobile, reveals, FAQ, formulário
   ============================================================ */

(function () {
  "use strict";

  const WHATSAPP_NUMBER = "5592981559269";

  /* ---------- Header com fundo ao rolar ---------- */
  const header = document.getElementById("header");
  const whatsFloat = document.getElementById("whatsFloat");

  function onScroll() {
    const scrolled = window.scrollY > 40;
    header.classList.toggle("is-scrolled", scrolled);

    // Botão flutuante aparece após rolar a primeira dobra
    whatsFloat.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.5);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");

  burger.addEventListener("click", function () {
    const isOpen = mobileMenu.classList.toggle("is-open");
    burger.classList.toggle("is-open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // Fecha o menu ao clicar em qualquer link
  mobileMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("is-open");
      burger.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  /* ---------- Animações de entrada (scroll reveal) ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- FAQ: fecha os outros ao abrir um ---------- */
  const faqItems = document.querySelectorAll(".faq__item");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item && other.open) other.open = false;
        });
      }
    });
  });

  /* ---------- Máscara de telefone ---------- */
  const phoneInput = document.getElementById("telefone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      let v = phoneInput.value.replace(/\D/g, "").slice(0, 11);
      if (v.length > 6) {
        v = "(" + v.slice(0, 2) + ") " + v.slice(2, 7) + "-" + v.slice(7);
      } else if (v.length > 2) {
        v = "(" + v.slice(0, 2) + ") " + v.slice(2);
      } else if (v.length > 0) {
        v = "(" + v;
      }
      phoneInput.value = v;
    });
  }

  /* ---------- Formulário → WhatsApp ---------- */
  const leadForm = document.getElementById("leadForm");
  if (leadForm) {
    leadForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const fields = leadForm.querySelectorAll("input, select, textarea");
      let valid = true;

      fields.forEach(function (field) {
        const empty = !field.value || field.value.trim() === "";
        field.classList.toggle("is-invalid", empty);
        if (empty) valid = false;
      });

      if (!valid) {
        const firstInvalid = leadForm.querySelector(".is-invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const nome = document.getElementById("nome").value.trim();
      const telefone = document.getElementById("telefone").value.trim();
      const assunto = document.getElementById("assunto").value;
      const mensagem = document.getElementById("mensagem").value.trim();

      const texto =
        "Olá, Dra. Karla! Vim pelo site e gostaria de uma análise do meu caso.\n\n" +
        "*Nome:* " + nome + "\n" +
        "*Telefone:* " + telefone + "\n" +
        "*Situação:* " + assunto + "\n\n" +
        "*Relato:* " + mensagem;

      const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(texto);
      window.open(url, "_blank", "noopener");

      leadForm.reset();
    });

    // Remove o estado de erro assim que o usuário digita
    leadForm.querySelectorAll("input, select, textarea").forEach(function (field) {
      field.addEventListener("input", function () {
        field.classList.remove("is-invalid");
      });
      field.addEventListener("change", function () {
        field.classList.remove("is-invalid");
      });
    });
  }

  /* ---------- Ano dinâmico no rodapé ---------- */
  const ano = document.getElementById("ano");
  if (ano) ano.textContent = String(new Date().getFullYear());
})();
