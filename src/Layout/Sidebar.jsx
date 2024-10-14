import React from 'react';
import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
    return (
        <div id='sidebar'>
            <ul>
                <li><NavLink className="nav-link" to="/">Thống kê</NavLink></li>
                <li><a href="#">Quy trình mẫu</a></li>
                <li><a href="#">Hành chính</a></li>
                <li><a href="#">Chuyên môn</a></li>
                <li><a href="#">NCKH</a></li>
                <li><NavLink className="nav-link" to="/daotao">Đào tạo</NavLink></li>
                <li><a href="#">Hợp tác quốc tế</a></li>
                <li><a href="#">Báo cáo, thống kê, lưu trữ, thư viện</a></li>
                <li><a href="#">Công vệc khác</a></li>
            </ul>

        </div>
    )
}
