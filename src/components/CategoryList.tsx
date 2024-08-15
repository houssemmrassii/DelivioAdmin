import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, IconButton, MenuItem, Select, FormControl } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
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
        setFilteredCategories(categoryList);
      } catch (error) {
        setError('Échec de la récupération des catégories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setFilteredCategories(
      categories.filter(category =>
        searchTerm === '' || category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, categories]);

  const handleDelete = async (id: string) => {
    try {
      const docRef = doc(db, 'category', id);
      await deleteDoc(docRef);
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      setError('Échec de la suppression de la catégorie');
    }
  };

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
    <Container className="category-list-container">
      <div>
        <h3>Liste des Catégories</h3>
      </div>
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
        <Button variant="contained" className="add-category-button" onClick={() => navigate('/categories/new')}>
           Ajouter Catégorie
        </Button>
      </div>
      <table className="category-table">
        <thead>
          <tr>
            <th>Image de la Catégorie</th>
            <th>Nom</th>
            <th>Sous-catégories</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((category) => (
            <tr key={category.id}>
              <td><img src={category.categoryImage} alt={category.name} className="category-image" /></td>
              <td>{category.name}</td>
              <td>
                <FormControl fullWidth>
                  <Select
                    value=""
                    displayEmpty
                  >
                    <MenuItem value="" disabled>List sous-catégorie</MenuItem>
                    {category.subCategories.map(sub => (
                      <MenuItem key={sub.id} value={sub.id}>{sub.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </td>
              <td>
                <IconButton className="action-button" onClick={() => handleEdit(category.id)}>
                  <Edit />
                </IconButton>
                <IconButton className="action-button delete-button" onClick={() => handleDelete(category.id)}>
                  <Delete />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default CategoryList;
