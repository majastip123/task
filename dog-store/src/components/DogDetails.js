import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDogBreed } from '../services/api';
import { useLocalStorage } from '../hooks/useLocalStorage';
 
const DogDetails = () => {
  const { id } = useParams();
  const [breedDetails, setBreedDetails] = useLocalStorage(`dog-breed-${id}`, null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBreedDetails = async () => {
      if (!breedDetails) {
        setLoading(true);
        try {
          const data = await getDogBreed(id);
          setBreedDetails(data.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };
    loadBreedDetails();
  }, [id, breedDetails, setBreedDetails]);

  if (loading) return <div>Loading ...</div>;
  if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  if (!breedDetails) return null;

  const { attributes } = breedDetails;

  return (
    <div className="container">
      <Link to="/">
        ← Go Back
      </Link>

      <div>
        <h2>{attributes.name}</h2>
        {attributes.description && (
          <p>{attributes.description}</p>
        )}
        <div className="space-y-2">
          {attributes.min_life && (
            <p><span className="font-medium">Min Life:</span> {attributes.min_life}</p>
          )}
          {attributes.max_life && (
            <p><span className="font-medium">Max Life:</span> {attributes.max_life}</p>
          )}
          <p>
            <span className="font-medium">Hypoallergenic:</span> {attributes.hypoallergenic ? 'Yes' : 'No'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DogDetails;
