"use client";

import {
  CustomerServiceOutlined,
  SafetyCertificateOutlined,
  SyncOutlined,
  TruckOutlined,
} from "@ant-design/icons";

const VALUES = [
  {
    icon: <TruckOutlined />,
    title: "Free delivery",
    text: "On every order above ₹25,000",
  },
  {
    icon: <SafetyCertificateOutlined />,
    title: "Secure payments",
    text: "Cards, UPI and net banking",
  },
  {
    icon: <SyncOutlined />,
    title: "Easy returns",
    text: "30-day return window",
  },
  {
    icon: <CustomerServiceOutlined />,
    title: "Support 24×7",
    text: "Real humans, any time zone",
  },
];

export function ValueStrip() {
  return (
    <div className="value-strip">
      {VALUES.map((value) => (
        <div className="value-item" key={value.title}>
          {value.icon}
          <div>
            <strong>{value.title}</strong>
            <span>{value.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
