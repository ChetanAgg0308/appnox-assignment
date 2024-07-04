import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import { responseData } from "./responseData";

const DynamicMenu = () => {
    // State to manage the collapsed state of the menu
    const [collapsed, setCollapsed] = useState(false);

    // Function to toggle the collapsed state
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    // Recursively transform the response data to match the structure needed for Ant Design Menu
    const transformMenuData = (data) => {
        return data.map((item) => {
            const transformedItem = {
                key: item.menuId,
                label: item.item,
            };
            if (item.children && item.children.length > 0) {
                transformedItem.children = transformMenuData(item.children);
            }
            return transformedItem;
        });
    };

    // Generate menu items from response data
    const menuItems = transformMenuData(responseData);

    return (
        <div style={{ width: 256 }}>
            {/* Button to toggle menu collapse */}
            <Button
                type="primary"
                onClick={toggleCollapsed}
                style={{ marginBottom: 16 }}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            {/* Render the menu with transformed items */}
            <Menu
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                items={menuItems}
            />
        </div>
    );
};

export default DynamicMenu;
