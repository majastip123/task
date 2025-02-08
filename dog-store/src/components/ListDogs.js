import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllDogBreeds, getAllGroups } from '../services/api';
import { useLocalStorage } from '../hooks/useLocalStorage';
import SearchInput from "./SearchInput.js"

const ListDogs = () => {

  const [breeds, setBreeds] = useLocalStorage('dog-breeds', []);
  const [groups, setGroups] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadAllDogBreeds = async () => {
      if (breeds.length === 0) {
        setLoading(true);
        try {
          const data = await getAllDogBreeds();
          const groupsData = await getAllGroups(); // Fetch groups
          setBreeds(data.data);
          setGroups(groupsData.data);
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      }
    };
    loadAllDogBreeds();
  }, [breeds.length, setBreeds]);

  const getGroupForBreed = (breedId) => {
    // Find the group by checking if any breed within the group matches the breedId
    const group = groups.find(group => 
      group.relationships.breeds.data.some(breed => breed.id === breedId)
    );
    return group ? group.attributes.name : 'Unknown Group';
  };
  //-check if the search matches any of the attributes for the dogs
  const filteredBreeds = breeds.filter(breed => {
    if (!searchTerm) { 
      return true;
    }
    const search = searchTerm.toLowerCase();
    const attributes = breed.attributes;
  
    return Object.values(attributes).some(val => {
      return val && val.toString().toLowerCase().includes(search); // Ensure return value here
    });
  });
    
  if (loading) return <div>Loading ...</div>;
  if (error) return <div>Error: {error}</div>;

  return (

    <div className="container">
      <h1>Dog Breeds</h1>
     
      <SearchInput term={searchTerm} onSearch={setSearchTerm} />
      
      <div>
        {filteredBreeds.map((breed) => (
          <Link
            to={`/breed/${breed.id}`}
            key={breed.id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="breed-card">
              <h3 className="breed-name">{breed.attributes.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Group:</span> {getGroupForBreed(breed.id)} {/* Display group */}
              </p>
              {breed.attributes.description && (
                <p className="text-gray-700 line-clamp-3">
                  {breed.attributes.description}
                </p>
              )}
              <div className="mt-2 text-blue-600 text-sm">Click to see more details →</div>
            </div>
          </Link>
        ))}
      </div>

      {filteredBreeds.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No results are matching your search input
        </div>
      )}
    </div>
  );
};

export default ListDogs;