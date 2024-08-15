import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './AddSubCategory.scss';

const AddSubCategory: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [subCategoryName, setSubCategoryName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const categorySnapshot = await getDocs(collection(db, 'category'));
      const categoryList = categorySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategories(categoryList);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (selectedCategory && subCategoryName) {
        await addDoc(collection(db, 'subcategory'), {
          name: subCategoryName,
          categoryId: selectedCategory
        });
        setError(null);
        alert('Sous-catégorie ajoutée avec succès!');
        setSelectedCategory('');
        setSubCategoryName('');
      } else {
        setError('Veuillez sélectionner une catégorie et entrer un nom de sous-catégorie');
      }
    } catch (error) {
      setError('Échec de l\'ajout de la sous-catégorie');
    }
  };

  return (
    <Container className="add-subcategory-form">
      <Typography variant="h4" gutterBottom>
        Ajouter une Sous-Catégorie
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel shrink>Choisir une Catégorie</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as string)}
            required
            sx={{
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FF9A40',
              },
              '& .MuiOutlinedInput-input': {
                backgroundColor: 'rgba(255, 154, 64, 0.05)',
              },
              '& .MuiInputLabel-root': {
                paddingBottom: '5px',
                backgroundColor: 'white',
              },
            }}
          >
            {categories.map(category => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel shrink>Nom de la Sous-Catégorie</InputLabel>
          <TextField
            variant="outlined"
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            required
            fullWidth
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#FF9A40',
                },
              },
              '& .MuiOutlinedInput-input': {
                backgroundColor: 'rgba(255, 154, 64, 0.05)',
                textAlign: 'center',
              },
              '& .MuiInputLabel-root': {
                paddingBottom: '5px',
                backgroundColor: 'white',
              },
            }}
          />
        </FormControl>
        <div className="form-actions">
          <Button type="submit" variant="contained" color="primary">
            Ajouter la Sous-Catégorie
          </Button>
        </div>
        {error && <Typography color="error" className="error">{error}</Typography>}
      </form>
    </Container>
  );
};

export default AddSubCategory;
