import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './ProductList.scss';

interface Product {
  id: string;
  productName: string;
  productCategory: string;
  productSpecCategory: string;
  productImage: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productCollection = collection(db, 'product');
        const productSnapshot = await getDocs(productCollection);
        const productList: Product[] = productSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        setProducts(productList);
        setFilteredProducts(productList); // Initialize filtered products
      } catch (error) {
        setError('Échec de la récupération des données');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        searchTerm === '' || product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  const handleDelete = async (productId: string) => {
    try {
      await deleteDoc(doc(db, 'product', productId));
      setProducts(products.filter(product => product.id !== productId));
      setFilteredProducts(filteredProducts.filter(product => product.id !== productId));
    } catch (error) {
      setError('Échec de la suppression du produit');
    }
  };

  const handleUpdate = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  if (loading) {
    return <Typography>Chargement...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container className="product-list-container">
      <Typography variant="h4" gutterBottom>
        Liste des Produits
      </Typography>
      <div className="search-export-container">
        <form className="form-search" onSubmit={(e) => e.preventDefault()}>
          <fieldset className="name">
            <input
              type="text"
              placeholder="Rechercher ici..."
              className="search-input"
              name="name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </fieldset>
          <div className="button-submit">
            <button type="submit" className="search-button">
              <i className="icon-search"></i>
            </button>
          </div>
        </form>
        
        <div className="add-buttons">
          <Button
            variant="contained"
            className="add-productlist-button"
            onClick={() => navigate('/categories/new')}
          >
             Ajouter Catégorie
          </Button>
          <Button
            variant="contained"
            className="add-productlist-button"
            onClick={() => navigate('/subcategories/new')}
          >
             Ajouter Sous-Catégorie
          </Button>
          <Button
            variant="contained"
            className="add-productlist-button"
            onClick={() => navigate('/products/new')}
          >
             Ajouter Produit
          </Button>
        </div>
      </div>
      <div className="table-container">
        <ul className="table-title">
          <li>Image du Produit</li>
          <li>Nom</li>
          <li>Catégorie</li>
          <li>Sous-Catégorie</li>
          <li>Action</li>
        </ul>
        {filteredProducts.map((product, index) => (
          <ul key={product.id} className={`product-item ${index % 2 === 0 ? 'even-row' : 'odd-row'}`}>
            <li>
              <img src={product.productImage} alt={product.productName} className="product-image" />
            </li>
            <li>{product.productName}</li>
            <li>{product.productCategory || 'Inconnu'}</li>
            <li>{product.productSpecCategory || 'Inconnu'}</li>
            <li>
              <IconButton className="action-button" onClick={() => handleUpdate(product.id)}>
                <Edit />
              </IconButton>
              <IconButton className="action-button delete-button" onClick={() => handleDelete(product.id)}>
                <Delete />
              </IconButton>
            </li>
          </ul>
        ))}
      </div>
    
    </Container>
  );
};

export default ProductList;
