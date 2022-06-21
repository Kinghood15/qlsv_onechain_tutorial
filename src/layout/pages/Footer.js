import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Footer() {
    return (
        <div className="footer 2xl bg-gray-900 w-full h-58">
            <div className="footerHeader mt-5 p-4">
                <h1 className="w-3/4 m-auto text-white font-bold text-3xl">Acodern University</h1>
                <div className="w-3/4 h-15 m-auto grid grid-rows-2 grid-flow-col gap-5">
                    <div className=" w-15 h-5 text-white">Chi nhánh Hà Nội</div>
                    <div className=" w-15 h-5 text-white">SĐT :01234567809</div>
                    <div className=" w-15 h-5 text-white">Chi nhánh Đà Nẵng</div>
                    <div className=" w-15 h-5 text-white">SĐT: 023456666666</div>
                    <div className=" w-15 h-5 text-white">Chi nhánh Hà Nội</div>
                    <div className=" w-15 h-5 text-white">SDT 0355560928</div>
                </div>
            </div>
            <div className="footerFooter w-3/4 mx-auto p-5 text-center border-top-1">
                <span className="text-white text-sm">Copyright  <FontAwesomeIcon size={24} icon="fa-regular fa-coffee" />  An Alex Nguyễn </span>
            </div>
        </div>
    );
};