import React from 'react'
import './dashboard.css'
import { Link, Outlet } from 'react-router-dom'

export default function dashboard() {

    return (
        <>
            <header
                className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow"
            >
                <Link
                    to={"/dashboard"}
                    class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white"
                    href="#"
                > Isoterm
                </Link>

                <ul className="navbar-nav flex-row d-md-none">
                    <li className="nav-item text-nowrap">
                        <button
                            className="nav-link px-3 text-white"
                            type="button"
                        >

                        </button>
                    </li>
                    <li className="nav-item text-nowrap">
                        <button
                            className="nav-link px-3 text-white"
                            type="button"
                        >

                        </button>
                    </li>
                </ul>
                <div id="navbarSearch" className="navbar-search w-100 collapse">
                    <input
                        className="form-control w-100 rounded-0 border-0"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </div>
            </header>
            <div className="container-fluid">
                <div className="row">
                    <div
                        className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary"
                    >
                        <div
                            className="offcanvas-md offcanvas-end bg-body-tertiary"
                            tabindex="-1"
                            id="sidebarMenu"
                            aria-labelledby="sidebarMenuLabel"
                        >
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="sidebarMenuLabel">
                                    Isoterm
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="offcanvas"
                                    data-bs-target="#sidebarMenu"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div
                                className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto"
                            >
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <Link
                                            to="aires"
                                            className="nav-link d-flex align-items-center gap-2 active"
                                            aria-current="page"
                                            href="#"
                                        >

                                            Aires Acondicionados
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to="vendedores"
                                            className="nav-link d-flex align-items-center gap-2"
                                            href="#">

                                            Vendedores
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    )
}
