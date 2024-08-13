import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';    
import { Card, Row, Col, Table } from 'antd';

const chartData = [
  { name: 'Jan', ventes: 4000, revenus: 2400, commandes: 2400, visiteurs: 3400 },
  { name: 'Fév', ventes: 3000, revenus: 1398, commandes: 2210, visiteurs: 3300 },
  { name: 'Mar', ventes: 2000, revenus: 9800, commandes: 2290, visiteurs: 3200 },
  { name: 'Avr', ventes: 2780, revenus: 3908, commandes: 2000, visiteurs: 3100 },
  { name: 'Mai', ventes: 1890, revenus: 4800, commandes: 2181, visiteurs: 3000 },
  { name: 'Juin', ventes: 2390, revenus: 3800, commandes: 2500, visiteurs: 2900 },
  { name: 'Juil', ventes: 3490, revenus: 4300, commandes: 2100, visiteurs: 2800 },
];

const shopSellersData = [
  { key: 1, magasin: 'Robert', categories: 'Cuisine, Animaux', total: '1 000 €', achats: 73 },
  { key: 2, magasin: 'Calvin', categories: 'Santé, Épicerie', total: '4 000 €', achats: 66 },
  { key: 3, magasin: 'Dwight', categories: 'Électronique', total: '2 700 €', achats: 15890 },
  // Plus de données...
];

const productOverviewData = [
  { key: 1, nom: 'Chats Moelleux', id: '#327', prix: '11,70 €', quantité: 28, statut: 'En Vente' },
  { key: 2, nom: 'Formule Taste of the Wild', id: '#380', prix: '8,99 €', quantité: 10, statut: 'En Vente' },
  { key: 3, nom: 'Nourriture Naturelle Wellness', id: '#126', prix: '5,22 €', quantité: 578, statut: '--/--' },
  // Plus de données...
];

const Dashboard: React.FC = () => {
  return (
    <div style={{ width: '100%', padding: '20px' }}>
      <Row gutter={[16, 16]}>
        {/* Top Metrics */}
        <Col span={6}>
          <Card title="Ventes Totales" bordered={false}>
            <p>34 945</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Revenus Totaux" bordered={false}>
            <p>37 802 €</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Commandes Payées" bordered={false}>
            <p>34 945</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Visiteurs Totals" bordered={false}>
            <p>34 945</p>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col span={12}>
          {/* Line Chart for Recent Orders */}
          <Card title="Commandes Récentes" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ventes" stroke="#8884d8" />
                <Line type="monotone" dataKey="revenus" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={12}>
          {/* Top Products */}
          <Card title="Meilleurs Produits" bordered={false}>
            <Table
              dataSource={productOverviewData}
              pagination={false}
              columns={[
                { title: 'Nom', dataIndex: 'nom', key: 'nom' },
                { title: 'ID Produit', dataIndex: 'id', key: 'id' },
                { title: 'Prix', dataIndex: 'prix', key: 'prix' },
                { title: 'Quantité', dataIndex: 'quantité', key: 'quantité' },
                { title: 'Statut', dataIndex: 'statut', key: 'statut' },
              ]}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col span={12}>
          {/* Best Shop Sellers */}
          <Card title="Meilleurs Magasins" bordered={false}>
            <Table
              dataSource={shopSellersData}
              pagination={false}
              columns={[
                { title: 'Magasin', dataIndex: 'magasin', key: 'magasin' },
                { title: 'Catégories', dataIndex: 'categories', key: 'categories' },
                { title: 'Total', dataIndex: 'total', key: 'total' },
                { title: 'Achats', dataIndex: 'achats', key: 'achats' },
              ]}
            />
          </Card>
        </Col>

        <Col span={12}>
          {/* Top Countries by Sales */}
          <Card title="Meilleurs Pays Par Ventes" bordered={false}>
            <Table
              dataSource={[
                { key: 1, pays: 'Turquie', ventes: '37 802 €', changement: '1,56%' },
                { key: 2, pays: 'Belgique', ventes: '37 802 €', changement: '1,56%' },
                // Plus de données...
              ]}
              pagination={false}
              columns={[
                { title: 'Pays', dataIndex: 'pays', key: 'pays' },
                { title: 'Ventes', dataIndex: 'ventes', key: 'ventes' },
                { title: 'Changement', dataIndex: 'changement', key: 'changement' },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
