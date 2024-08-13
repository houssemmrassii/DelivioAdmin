import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './SubCategoryList.scss';

interface SubCategory {
  id: string;
  name: string;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
}

interface GroupedCategories {
  categoryName: string;
  subCategories: SubCategory[];
}

const SubCategoryList: React.FC = () => {
  const [groupedCategories, setGroupedCategories] = useState<GroupedCategories[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoriesAndSubCategories = async () => {
      try {
        const categoriesSnapshot = await getDocs(collection(db, 'category'));
        const subCategoriesSnapshot = await getDocs(collection(db, 'subcategory'));

        const categories: Category[] = categoriesSnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
        }));

        const subCategories: SubCategory[] = subCategoriesSnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          categoryId: doc.data().categoryId,
        }));

        // Group subcategories by category
        const grouped = categories.map(category => ({
          categoryName: category.name,
          subCategories: subCategories.filter(sub => sub.categoryId === category.id),
        }));

        setGroupedCategories(grouped);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndSubCategories();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="sub-category-table-container">
      <table className="sub-category-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Subcategories</th>
          </tr>
        </thead>
        <tbody>
          {groupedCategories.map((group, index) => (
            <tr key={index}>
              <td>{group.categoryName}</td>
              <td>
                <ul>
                  {group.subCategories.map(sub => (
                    <li key={sub.id}>{sub.name}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubCategoryList;
