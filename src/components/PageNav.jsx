const PageNav = () => {
  return (
    <header>
      <nav className="fixed top-0  left-1/6 right-0 z-50 flex w-[100%] md:w-[84%]  lg:flex-wrap  lg:py-2 bg-nav">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div className="ms-2">
            <a className="text-3xl text-white font-semibold" href="#">
              DirtMan
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default PageNav;
