import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, IconButton, MenuItem, Select, FormControl } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './SStyle.css';
import './CategoryList.scss';

interface SubCategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  categoryImage: string;
  subCategories: SubCategory[];
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryCollection = collection(db, 'category');
        const categorySnapshot = await getDocs(categoryCollection);
        const categoryList: Category[] = categorySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Category[];
        setCategories(categoryList);
        setFilteredCategories(categoryList); // Initialize filtered categories
      } catch (error) {
        setError('Échec de la récupération des catégories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Search logic
  useEffect(() => {
    setFilteredCategories(
      categories.filter(category =>
        searchTerm === '' || category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, categories]);

  // Delete category logic
  const handleDelete = async (id: string) => {
    try {
      const docRef = doc(db, 'category', id);
      await deleteDoc(docRef);
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      setError('Échec de la suppression de la catégorie');
    }
  };

  // Update category logic (navigate to edit page)
  const handleEdit = (id: string) => {
    navigate(`/categories/edit/${id}`);
  };

  if (loading) {
    return <Typography>Chargement...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Liste des Catégories
      </Typography>
      <div className="search-export-container">
        <form className="form-search" onSubmit={(e) => e.preventDefault()}>
          <fieldset className="name">
            <input
              type="text"
              placeholder="Recherchez ici..."
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
        <Button variant="contained" className="export-button">
          <i className="icon-file-text"></i>Exporter toutes les catégories
        </Button>
      </div>
      <div className="table-container">
        <ul className="table-title">
          <li>Image de la Catégorie</li>
          <li>Nom</li>
          <li>Sous-catégories</li>
          <li>Action</li>
        </ul>
        {filteredCategories.map((category, index) => (
          <ul key={category.id} className={`category-item ${index % 2 === 0 ? 'even-row' : 'odd-row'}`}>
            <li>
              <img src={category.categoryImage} alt={category.name} className="category-image" />
            </li>
            <li>{category.name}</li>
            <li>
              <FormControl fullWidth>
                <Select
                  value=""
                  displayEmpty
                >
                  <MenuItem value="" disabled>Sélectionnez une sous-catégorie</MenuItem>
                  {category.subCategories.map(sub => (
                    <MenuItem key={sub.id} value={sub.id}>{sub.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </li>
            <li>
              <IconButton className="action-button" onClick={() => handleEdit(category.id)}>
                <Edit />
              </IconButton>
              <IconButton className="action-button delete-button" onClick={() => handleDelete(category.id)}>
                <Delete />
              </IconButton>
            </li>
          </ul>
        ))}
      </div>
      <div className="pagination-container">
        <IconButton className="pagination-button">&lt;</IconButton>
        <IconButton className="pagination-button active">1</IconButton>
        <IconButton className="pagination-button">2</IconButton>
        <IconButton className="pagination-button">3</IconButton>
        <IconButton className="pagination-button">&gt;</IconButton>
      </div>
    </Container>
  );
};

export default CategoryList;
