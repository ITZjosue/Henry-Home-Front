import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Row, Col, Image, Modal } from "antd";
import { SearchOutlined, SolutionOutlined } from "@ant-design/icons";
import { googleLogOut } from "../FilesStore/Actions";
import { useDispatch } from "react-redux";
import "../assets/css/NavBar/NavBar.scss";
import "antd/dist/antd.css";

import Logo from "../assets/img/HenryHome.png";
import Button from "../UI/Button.jsx";
import Login from "./Formulario";

import { Selects } from "../UI/Input.jsx";

const navBtn = {
  fontSize: 15,
};

const modalBtn = {
  fontSize: 15,
  width: 100,
};

export default function NavBar() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [typeLogIn, setTypeLogIn] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();

  const params = useParams()
  const location = useLocation()
  

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")))
  }, [])

  const showModalR = () => {
    setTypeLogIn("Register");
    setIsModalVisible(true);
  };

  const showModalS = () => {
    setTypeLogIn("SignIn");
    setIsModalVisible(true);
  };

  const showSearch = () => {
    setIsSearchVisible(true)
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const closeSearch = () => {
    setIsSearchVisible(false);
  };

  const logOut = () => {
    dispatch(googleLogOut());
    setUser(null)
    window.location.reload()
  }
 
  return (
    <div className="allNav">
      <Row gutter={20}>
        {/* ---------------- Logo ---------------- */}

        <Col span={3}>
          <Link to="/">
            <Image className="navLogo" preview={false} src={Logo} />
          </Link>
        </Col>

        {/* ---------------- Desktop Version ---------------- */}

        <Col className="navInput" offset={3} span={0} sm={0} md={8} lg={8}>
          <Selects options={provincias} />
        </Col>
        <Col className="navBtn" xs={0} sm={0} md={3} lg={3}>
          {user ? (
            <img src={user.result.profile_img} alt="" />
          ) : (
            <Button
              styles={navBtn}
              click={showModalS}
              types="ghost"
              text="Sign In"
            />
          )}
        </Col>
        <Col className="navBtn" xs={0} sm={0} md={3} lg={3}>
          {user ? (
            user?.result?.role === "Moderator" ? (
              <Link to={`/owner/${user?.result?.id}`}>
                <h3>
                  {user.result.name
                    ? user.result.name
                    : `${user.result.firstName} ${user.result.lastName}`}
                </h3>
              </Link>
            ) : (
              <Link to={`/user/${user?.result?.id}`}>
                <h3>
                  {user.result.name
                    ? user.result.name
                    : `${user.result.firstName} ${user.result.lastName}`}
                </h3>
              </Link>
            )
          ) : (
            <Button
              styles={navBtn}
              click={showModalR}
              types="ghost"
              text="Register"
            />
          )}
        </Col>
        <Col className="navBtn" xs={0} sm={0} md={3} lg={3}>
          {user && (
            <Button
              styles={navBtn}
              click={logOut}
              types="danger"
              text="Log Out"
            />
          )}
        </Col>

        {/* ---------------- Mobile version ---------------- */}

        <Col
          xs={{ span: 4, offset: 13 }}
          sm={{ span: 3, offset: 15 }}
          md={0}
          lg={0}
        >
          <SearchOutlined className="navIcon" onClick={showSearch} />
        </Col>

        <Col
          xs={{ span: 4, offset: 0 }}
          sm={{ span: 3, offset: 0 }}
          md={0}
          lg={0}
        >
          {user ? (
            <img src={user.result.profile_img} alt="" />
          ) : (
            <SolutionOutlined className="navIcon" onClick={showModalS} />
          )}
        </Col>
      </Row>

      <Modal
        title={typeLogIn}
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <Login nombre={typeLogIn} landing={false} />
      </Modal>

      <Modal
        title="Search..."
        visible={isSearchVisible}
        onOk={closeSearch}
        onCancel={closeSearch}
        footer={[
          <Button
            styles={modalBtn}
            click={closeSearch}
            types="ghost"
            text="Return"
          />,
          <Button
            styles={modalBtn}
            click={closeSearch}
            types="ghost"
            text="Search"
          />,
        ]}
      >
        <Selects options={provincias} />
      </Modal>
    </div>
  );
}
