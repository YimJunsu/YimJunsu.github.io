/**
 * 포트폴리오 웹사이트의 메인 JavaScript 파일
 * 헤더 토글, 스크롤 이벤트, 애니메이션 등의 인터랙티브 기능을 담당합니다.
 */

(function() {
  "use strict";

  /**
   * 페이지 로드 완료 시 preloader 숨김 처리
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 1000);
      }, 1000);
    });
  }

  /**
   * 헤더 토글 버튼 기능
   */
  const toggleButton = document.querySelector('.header-toggle');
  
  if (toggleButton) {
    toggleButton.addEventListener('click', function(event) {
      event.preventDefault();
      const body = document.querySelector('body');
      body.classList.toggle('mobile-nav-active');
      
      // 클래스 토글
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
      
      // 모바일 메뉴 열렸을 때 스크롤 방지
      if (body.classList.contains('mobile-nav-active')) {
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.documentElement.style.overflow = '';
      }
    });
  }
  
  // 화면 크기 변경 시 자동으로 모바일 네비게이션 상태 조정
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 1200) {
      // 데스크톱 사이즈에서는 모바일 네비게이션 비활성화
      document.querySelector('body').classList.remove('mobile-nav-active');
      if (toggleButton) {
        toggleButton.classList.add('bi-list');
        toggleButton.classList.remove('bi-x');
      }
    }
  });

  /**
   * 모바일 화면에서 메뉴 클릭시 메뉴 닫기
   */
  document.querySelectorAll('#navmenu a').forEach(navItem => {
    navItem.addEventListener('click', () => {
      if (document.querySelector('body').classList.contains('mobile-nav-active')) {
        document.querySelector('body').classList.remove('mobile-nav-active');
        document.querySelector('.header-toggle').classList.add('bi-list');
        document.querySelector('.header-toggle').classList.remove('bi-x');
      }
    });
  });

  /**
   * 스크롤 위치에 따른 네비게이션 활성화
   */
  const navLinks = document.querySelectorAll('#navmenu a');
  
  function navActive() {
    let position = window.scrollY + 200;
    navLinks.forEach(navLink => {
      if (!navLink.hash) return;
      let section = document.querySelector(navLink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    });
  }

  window.addEventListener('load', navActive);
  document.addEventListener('scroll', navActive);

  /**
   * 스크롤 상단 버튼 표시/숨김
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const toggleScrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * 애니메이션 초기화 (AOS 라이브러리)
   */
  function initializeAOS() {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', initializeAOS);

  /**
   * Typed.js 초기화 (타이핑 효과)
   */
  const typed = document.querySelector('.typed');
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * PureCounter 초기화 (숫자 카운팅 효과)
   */
  new PureCounter();

  /**
   * GLightbox 초기화 (이미지 갤러리)
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Isotope 레이아웃 초기화 (포트폴리오 필터링)
   */
  let portfolioContainer = document.querySelector('.portfolio-container');
  if (portfolioContainer) {
    let portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    let portfolioFilters = document.querySelectorAll('#portfolio-flters li');
    portfolioFilters.forEach(filter => {
      filter.addEventListener('click', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      });
    });
  }

  /**
   * 스킬 아이템 애니메이션
   */
  function initSkillsAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
      // 스태거드 애니메이션을 위한 지연 시간 설정
      setTimeout(() => {
        item.classList.add('animated');
      }, index * 100);
    });
  }
  
  window.addEventListener('load', initSkillsAnimation);

  /**
   * 이미지 로딩 완료 후 Isotope 레이아웃 재정렬
   */
  const imageLoaded = document.querySelector('.isotope-container');
  if (imageLoaded) {
    imagesLoaded(imageLoaded, function() {
      const iso = new Isotope(imageLoaded, {
        itemSelector: '.isotope-item',
      });
      
      // 필터 버튼 이벤트 리스너
      document.querySelectorAll('.isotope-filters li').forEach(filter => {
        filter.addEventListener('click', function() {
          document.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          
          const filterValue = this.getAttribute('data-filter');
          iso.arrange({
            filter: filterValue
          });
        });
      });
    });
  }

})();