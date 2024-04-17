const BannerTopDesktop = () => {
    return (
        <div className="d-md-flex d-none bg-white ps-6 pe-4 py-2 z-1 justify-content-between align-items-center banner-top position-fixed w-100">
            <img width={80} src="/images/logo-orange-qro-agendar.svg" alt="logo-orange-qro-agendar.svg" />
            <img width={40} height={40} className="border-orange rounded-circle" src="/images/person.png" alt="" />
        </div>
    );
}

export default BannerTopDesktop;