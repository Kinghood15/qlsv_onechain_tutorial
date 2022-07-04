const Table = () => {
    return (
        <>
            <div className="main-table m-8 p-5 ">
                <table className=" w-full rounded-xl ">
                    <thead className="bg-gray-50">
                        <tr className="bg-gray">
                            <th className="p-3 border border-slate-600 w-10 text-sm font-semibold tracking-wide">STT</th>
                            <th className="p-3 border border-slate-600 text-sm font-semibold tracking-wide">Tên sinh viên</th>
                            <th className="p-3 border border-slate-600 text-sm font-semibold tracking-wide">Mã sinh viên</th>
                            <th className="p-3 border border-slate-600 text-sm font-semibold tracking-wide">Email</th>
                            <th className="p-3 border border-slate-600 text-sm font-semibold tracking-wide">Địa chỉ</th>
                            <th className="p-3 border border-slate-600 text-sm font-semibold tracking-wide">Ngày sinh</th>
                            <th className="p-3 border border-slate-600 text-sm font-semibold tracking-wide">Giới tính</th>
                            <th className="p-3 border border-slate-600 text-sm font-semibold tracking-wide">Khoa ngành</th>
                            <th className="p-3 border border-slate-600 text-sm font-semibold tracking-wide">Lớp</th>
                            <th className="p-3 border border-slate-600 w-52 text-sm font-semibold tracking-wide">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentPosts.length > 0 && currentPosts.map((doc, index) => {
                                return (
                                    <>
                                        <tr className={isActive ? "bg-white " : "bg-gray"}>
                                            <td className="p-3 h-full text-sm border border-slate-200 italic tracking-wide text-center">{index + 1}</td>
                                            <td className="p-3 h-full text-sm border border-slate-200 italic tracking-wide text-left"><div className="content-table flex items-center"><img className="w-10 h-10 rounded-xl mx-3" src={doc.avatar ? doc.avatar : ''} alt={"avatar " + doc.lastName ? doc.lastName : ''} />{(doc.firstName ? doc.firstName : '') + ' ' + (doc.lastName ? doc.lastName : '')}</div></td>
                                            <td className="p-3 h-full text-sm border border-slate-200 italic tracking-wide text-center">{doc.studentId}</td>
                                            <td className="p-3 h-full text-sm border border-slate-200 italic tracking-wide text-center">{doc.email}</td>
                                            <td className="p-3 h-full text-sm border border-slate-200 italic tracking-wide text-center">{doc.address}</td>
                                            <td className="p-3 h-full text-sm border border-slate-200 italic tracking-wide text-center">{doc.birthday}</td>
                                            <td className="p-3 h-full text-sm border border-slate-200 italic tracking-wide text-center">{doc.gender}</td>
                                            <td className="p-3 h-full text-sm border border-slate-200 italic tracking-wide text-center">{doc.scienceBranch}</td>
                                            <td className="p-3 h-full text-sm border border-slate-200 italic tracking-wide text-center">{doc.nameClass}</td>
                                            <td className="p-3 h-full text-sm border border-slate-200 italic tracking-wide text-center ">
                                                <div className="content-table flex justify-around items-around">
                                                    <button className="p-3 rounded-xl bg-sky-200" onClick={() => viewUserId(doc.id)}><AiOutlineEye size={20} /></button>
                                                    <button className="p-3 rounded-xl bg-sky-200" onClick={() => getUserId(doc.id)}><AiOutlineEdit size={20} /></button>
                                                    <button className="p-3 rounded-xl bg-red-200" onClick={() => deleteHandler(doc.id)}><AiOutlineDelete size={20} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                        {/* {isOpenModalView && <Modal modal={"view"} data={doc} closeModal={setIsOpenModalView} key={doc.id} />} */}
                                        {/* {isOpenModalEdit && <Modal modal={"edit"} data={doc} closeModal={""} />} */}
                                    </>
                                )
                            })
                        }
                        {
                            isOpenModalView && <Modal modal={"view"} data={isModalData} closeModal={setIsOpenModalView} />
                        }
                        {
                            isOpenModalEdit && <Modal modal={"edit"} data={isModalData} closeModal={setIsOpenModalEdit} />
                        }
                    </tbody>
                </table>
                <div className="p-5">
                    <div className="container mx-auto px-4">
                        <nav className="flex flex-row flex-nowrap justify-between md:justify-center items-center" aria-label="Pagination">
                            {pageNumbers.map((number) => {

                                if (number + 1 < pageNumbers.length) {
                                    return (
                                        <button key={number + 1} onClick={() => { paginate(number + 1); setPageNumberActive(number + 1) }} className={"hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300" + `${pageNumberActive === number + 1 ? " bg-sky-300" : ""}`} title={`Page ${number + 1}`}>
                                            {number + 1}
                                        </button>
                                    );
                                }

                            })}
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Table;