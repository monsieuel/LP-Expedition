document.addEventListener("DOMContentLoaded", () => {

  /* ======================================================
     NAV
     ====================================================== */

  const navbar = document.getElementById("navbar");
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 35);
  }, { passive: true });


  /* ======================================================
     ACTIVE NAV
     ====================================================== */

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".navbar nav a");
  const darkSectionIds = ["archive", "mails"];

  // warna kanvas halaman (area di balik status bar / toolbar Safari) mengikuti section yang aktif
  const pageColors = { archive: "#0f2351", mails: "#0e2d55" };
  const lightPageColor = "#dcebf8";

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      navLinks.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === "#" + entry.target.id
        );
      });

      navbar.classList.toggle("on-dark", darkSectionIds.includes(entry.target.id));
      document.documentElement.style.backgroundColor = pageColors[entry.target.id] || lightPageColor;
    });
  }, {
    rootMargin: "-40% 0px -50% 0px"
  });

  sections.forEach(section => sectionObserver.observe(section));


  /* ======================================================
     REVEAL
     ====================================================== */

  const revealItems = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  revealItems.forEach(item => revealObserver.observe(item));


  /* ======================================================
     GLIMPSE OF US SLIDER
     ====================================================== */

  const viewport = document.querySelector(".glimpse-viewport");
  const track = document.getElementById("glimpseTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dots = document.getElementById("dots");
  const cards = [...document.querySelectorAll(".memory-card")];

  let current = 0;

  function render() {
    const width = viewport.clientWidth;
    track.style.transform = `translateX(-${current * width}px)`;

    const activeCard = cards[current];
    if (activeCard) {
      viewport.style.height = activeCard.offsetHeight + "px";
    }

    updateDots();
  }

  function goTo(index) {
    const isWrapping = index < 0 || index >= cards.length;

    if (isWrapping) {
      track.style.transition = "none";
    }

    current = (index + cards.length) % cards.length;
    render();

    if (isWrapping) {
      track.offsetWidth; // force the browser to apply the jump before re-enabling
      track.style.transition = "";
    }
  }

  function updateDots() {
    [...dots.children].forEach((dot, index) => {
      dot.classList.toggle("active", index === current);
    });
  }

  cards.forEach((_, index) => {
    const dot = document.createElement("button");

    dot.className = "dot";
    dot.type = "button";
    dot.setAttribute("aria-label", "Memory " + (index + 1));

    dot.addEventListener("click", () => goTo(index));

    dots.appendChild(dot);
  });

  render();

  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));

  window.addEventListener("resize", render);
  window.addEventListener("load", render); // foto dimuat belakangan, hitung ulang tinggi slider


  /* ======================================================
     SWIPE LEFT / RIGHT
     ====================================================== */

  let touchStartX = 0;

  viewport.addEventListener("touchstart", event => {
    touchStartX = event.touches[0].clientX;
  }, { passive: true });

  viewport.addEventListener("touchend", event => {
    const diff = event.changedTouches[0].clientX - touchStartX;

    if (Math.abs(diff) < 40) return;

    if (diff < 0) {
      goTo(current + 1);
    } else {
      goTo(current - 1);
    }
  });


  /* ======================================================
     MAILS
     ====================================================== */

  const mails = [
    {
      number: "#1",
      title: "#1",
      body: `
        <p>hi, kak malika</p>

        <p>
          hehe maaf ya baru bisa ngomong ini sekarang. 
          i just want to say thank you so much udah hadir dalam kehidupan adek el yang gitu-gitu aja ini. 
          makasih udah jadi one of my closest people beberapa waktu ke belakang. 
          i truly appreciate your presence in my life, utamanya di waktu genting skripsian kala itu.
        </p>

        <p>
         kalau boleh jujur, tahun ini adalah tahun yang cukup berat. 
         gadeh.. berat banget. banyak hal yang terjadi, ga cuma karena faktor eksternal, tapi sedikit banyak juga yang berasal dari internal diri sendiri.
        </p>

        <p>
          you are one of the purest souls that i've ever met, kak. 
          mungkin bisa dibilang kita kenal belum begitu lama, tapi ga perlu diragukan lagi how great your personality is. 
          aku seneng dan bersyukur in this lifetime bisa dikasih kesempatan Allah untuk bertemu jiwa sepertimu. 
          maap kalo kadang lempeng atau kesannya ga excited or tidak peduli. tapi pada nyatanya, itu kebalikan dari semuanya. 
        </p>

        <p>
          sorry kalo aku sering ngilang dan agak susah buat mengungkapkan sesuatu. 
          aku minta maaf kalo masih ada banyak hal yang aku rasakan atau pikirkan yang kespill tipis tapi pada akhirnya cuma aku simpan untuk diri sendiri. 
          bukannya bermaksud tarik ulur, tapi ril masih takut untuk membuka diri dan percaya sama orang.
          but please know that i do appreciate you, more than i probably show. 
          dan karena orangnya sekarang kamu, nanti aku coba perbaiki biar lebih baik kedepannya ya. 
        </p>
       
        <p>
          makasih udah jadi orang yang pengertian dan somehow selalu punya cara sendiri untuk membuat suasana jadi lebih ringan. 
          makasih juga untuk hal-hal kecil yang mungkin menurut kamu biasa aja, tapi nyatanya buatku itu lebih dari yang aku minta.
        </p>

        <p>
          i might not show it enough, but i genuinely enjoy having you around. 
          kalo selama ini keliatannya lempeng-lempeng aja, please don't take it that way. 
          i probably just don't know how to react properly :] 
        </p>

        <p>
          anyway, i just wanted you to know that i'm really glad i met you. 
          semoga ke depannya kita bisa punya banyak cerita dan tentunya lebih banyak momen yang bisa masuk arsip ini.
        </p>

        <p>  
          thank you for being you, kak mal.
          i hope you know that you are appreciated, loved, and valued. 
          i hope you know that you are a blessing to the people around you. 
          and i hope you know that you are enough, just the way you are.
          and thank you for existing in my little corner of the universe :]
        </p>
 
      `
    },

    {
      number: "#2",
      title: "#2",
      body: `
        <p>
          and somewhere along the way, something changed. 
          somewhere between all the late-night conversations, the comfort, and all the yapp sessions, you became the reason i got my laugh back. 
          the reason i found the motivation to do things again. 
          you truly have made my life better just by being in it.
        </p>

        <p>
          somehow, you became more important to me than i ever expected. 
          i tried to ignore it, to keep things the same between us, convincing myself that it was just a phase. 
          but the feeling only grew stronger. 
        </p>

        <p>
          it was supposed to be a silly little crush, nothing serious, nothing i needed to think too much about. 
          but then suddenly, i started thinking of songs that reminded me of you. 
          you started showing up in my dreams for absolutely no reason. setiba-tiba itu.. 
          and somehow, i'd find myself getting ridiculously restless whenever you weren't around.
          little things that shouldn't have meant anything somehow started meaning everything.
        </p>

        <p>
          hal konyol lainnya adalah, it's funny how you keep shipping me with everyone, when the truth is, you're the one i've been in love with. 
          dan hal yang lebih aneh lagi adalah bukannya bete karena diledekin sama orang lain tapi malah uring-uringan sendiri. why anyone else but not you?
        </p>

        <p>
          and then i realized, i was really in love with you. 
          and it scared me. 
          every time i tried to push the thoughts away, somehow, you pulled me right back in. 
          and now, i can no longer hide it anymore.
        </p>

        <p>
          ya itulah... akupun gatau exact-nya kapan. 
          but i can say for sure, this feeling comes with a ridiculous amount of energy. 
          sampai aku sendiri kewalahan mati-matian nahan, trying not to fall for you. 
          tapi apalah dayaku makin ditahan malah makin kepikiran.
        </p>

        <p>
         so i'm sorry. it wasn't part of my plan to mess everything up. 
         i never meant for things to become complicated, or for this feeling to change anything between us
        </p>

        <p>
          but i guess the truth is, i can't help it. 
          i can't help the way i feel about you.
          i do love you. a lot more than you know. probably even more than i know how to explain myself.
          and if loving you is the riskiest thing my heart has ever done, it's also the purest thing that's ever happened to me.
          #isitbettertospeakortodiemoment
        </p>

        <p>
          i'm a little scared right know yk.. and you don't have to say anything right away. 
          i just wanted you to know what has been sitting in my heart for a while.
          and that's all i wanted.
          maaf kalo selama ini bikin bingung :(
        </p>
        
      `
    },

    {
      number: "#3",
      title: "#3",
      body: `
        <p>
          so.. i want to learn you.
        </p>

        <p>
          i want to learn you, not in the quick, surface level way people often settle for, where we exchange stories like summaries and call it knowing. 
          but in something quieter, the kind if knowing that unfolds over time, in layer, without force.
        </p>

        <p>
          i want to understand how you became who you are today. 
          the subtle experiences that shaped the way you think. 
          the moments that softened you, and the ones that made you build walls you don't always realize are still there. 
          i want to hear about the things you rarely get to explain fully.
        </p>

        <p>
          i'm curious about the way your mind works when you're not trying to be impressive or strong.
          the thoughts you have when you're tired, when you're honest, when you're not performing strength or certainty. 
          the beliefs you had to build to survive certain chapters of your life.
          the versions of you that existed before this one, and the parts that are still quietly forming, even now.
        </p>

        <p>
          i want to listen to you with patience, making room for your complexity without rushing to conclusions.
          and letting you tell a story halfway and comeback to it another day when you're ready. 
          i want to listen like that, not to respond with advice too quickly, not to compare your feelings to mine, not to decide whether what your feel make sense. 
          i'm here just to understand where it comes from, and what it has been trying to protect, or carry, or survive. 
        </p>

        <p>
          learning you to me means paying attention to the small details that most people overlook. 
          the pauses, the shifts in your voice, the stories you tell lightly and the ones you circle around. 
          not as puzzles to solve, buat as parts of a person's landscape.
        </p>

        <p>
          and i don't want to rush or to see everything in one day, i want to walk through it slowly, noticing where the ground feels solid and where it feels tender. 
          not stepping further than i'm invited. 
          not assuming access to places you're still protecting. 
          because curiosity, when it's gentle, it doesn't push doors open. 
          it waits until they're opened from the inside.
        </p>

        <p>
          to learn you, is to accept that you are not a fixed idea. 
          you are a person in motion, shaped by where you've been and still becoming who you will be. 
        </p>

        <p>
          and.. if you ever choose to let me see parts of your inner world, 
          i  would hold that with care. 
          and if loving you means i get to see your vulnerable side and the opportunity to help you then my hands are open wide for you. 
          because nothing that you do will ever make me love you less. 
        </p>

        <p>
          you're always gonna be loved by me, even on the days you feel hard to love. 
          because for me, you've always been worth it, in every single version of who you are.
        </p>

      `
    }
  ];

  const modal = document.getElementById("mailModal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const closeModal = document.getElementById("closeModal");
  const letterNumber = document.getElementById("letterNumber");
  const letterTitle = document.getElementById("letterTitle");
  const letterBody = document.getElementById("letterBody");

  document.querySelectorAll(".mail-card").forEach(card => {

    card.addEventListener("click", () => {
      const index = Number(card.dataset.mail);
      const mail = mails[index];

      letterNumber.textContent = mail.number;
      letterTitle.textContent = mail.title;
      letterBody.innerHTML = mail.body;

      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });

  });

  function closeLetter() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  closeModal.addEventListener("click", closeLetter);
  modalBackdrop.addEventListener("click", closeLetter);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
      closeLetter();
    }
  });

});
