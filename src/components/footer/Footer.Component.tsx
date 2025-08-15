const FooterComponent : React.FC = () => {
    return <footer className="footer fixed z-30 bottom-0 sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
  </aside>
</footer>
}

export default FooterComponent;