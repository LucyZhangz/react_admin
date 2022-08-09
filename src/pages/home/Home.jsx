import React from "react";
import { Col, Divider, Row, Card } from "antd";
import Style from "./home.module.less";
export default function Home() {
  return (
    <Row gutter={20}>
      <Col className="gutter-row" span={6}>
        <div className={Style.cardbgc}>
          <Card title="Card title" bordered={false}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className={Style.cardbgc}>
          <Card title="Card title" bordered={false}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className={Style.cardbgc}>
          <Card title="Card title" bordered={false}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className={Style.cardbgc}>
          <Card title="Card title" bordered={false}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
      </Col>
    </Row>
  );
}
