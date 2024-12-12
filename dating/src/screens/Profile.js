import React, { useState } from 'react';
import { 
  Edit2, 
  Camera, 
  MapPin, 
  Briefcase, 
  X 
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userProfile, setUserProfile] = useState({
    name: 'Előd',
    age: 22,
    location: 'Dunaújváros',
    job: 'Szoftverfejlesztő',
    education: 'DUE',
    height: 180,
    gender: 'Férfi',
    sexualOrientation: 'Heteroszexuális',
    relationshipGoal: 'Komoly kapcsolat',
    languages: ['Magyar', 'Angol','Orosz','Horvát','Thai'],
    bio: 'Próba bio',
    interests: ['Utazás', 'Főzés', 'Zene', 'Box'],
    photos: [
      'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/a8bf1a2c-259e-4e95-b2c2-bb995876ed63/a252bcd6-9a10-40be-bf99-1d850d2026e4.png',
      'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
    ]
  });

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const renderProfileContent = () => {
    if (isEditing) {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" 
              name="name"
              value={userProfile.name} 
              onChange={handleProfileChange}
              className="w-full p-2 border rounded"
              placeholder="Név"
            />
            <input 
              type="number" 
              name="age"
              value={userProfile.age} 
              onChange={handleProfileChange}
              className="w-full p-2 border rounded"
              placeholder="Életkor"
            />
          </div>
          
          <textarea 
            name="bio"
            value={userProfile.bio} 
            onChange={handleProfileChange}
            className="w-full p-2 border rounded h-24"
            placeholder="Mutasd be magad..."
          />

          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" 
              name="job"
              value={userProfile.job} 
              onChange={handleProfileChange}
              className="w-full p-2 border rounded"
              placeholder="Foglalkozás"
            />
            <input 
              type="text" 
              name="education"
              value={userProfile.education} 
              onChange={handleProfileChange}
              className="w-full p-2 border rounded"
              placeholder="Végzettség"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select 
              name="gender"
              value={userProfile.gender}
              onChange={handleProfileChange}
              className="w-full p-2 border rounded"
            >
              <option value="Férfi">Férfi</option>
              <option value="Nő">Nő</option>
              <option value="Egyéb">Egyéb</option>
            </select>

            <select 
              name="relationshipGoal"
              value={userProfile.relationshipGoal}
              onChange={handleProfileChange}
              className="w-full p-2 border rounded"
            >
              <option value="Komoly kapcsolat">Komoly kapcsolat</option>
              <option value="Barátság">Barátság</option>
              <option value="Alkalmi kapcsolat">Alkalmi kapcsolat</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Érdeklődési körök</label>
            <div className="flex flex-wrap gap-2">
              {userProfile.interests.map((interest, index) => (
                <input
                  key={index}
                  type="text"
                  value={interest}
                  onChange={(e) => {
                    const newInterests = [...userProfile.interests];
                    newInterests[index] = e.target.value;
                    setUserProfile(prev => ({
                      ...prev,
                      interests: newInterests
                    }));
                  }}
                  className="w-full p-2 border rounded mb-2"
                />
              ))}
              <button 
                onClick={() => setUserProfile(prev => ({
                  ...prev,
                  interests: [...prev.interests, '']
                }))}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                + Új érdeklődési kör
              </button>
            </div>
          </div>

          <button 
            onClick={handleEditProfile}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Mentés
          </button>
        </div>
      );
    }

    return (
      <>
        {/* Felső profilkép szekció */}
        <div className="relative">
          <img 
            src={userProfile.photos[0]} 
            alt="Profilkép" 
            onClick={() => handleImageClick(userProfile.photos[0])}
            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg cursor-pointer"
          />
          <button 
            className="absolute bottom-0 right-1/2 translate-x-1/2 bg-blue-500 text-white p-2 rounded-full"
          >
            <Camera size={20} />
          </button>
        </div>

        {/* Alapadatok */}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold">{userProfile.name}, {userProfile.age}</h2>
          <div className="flex justify-center items-center space-x-2 text-gray-600 mt-2">
            <MapPin size={18} />
            <span>{userProfile.location}</span>
          </div>
        </div>

        {/* Részletes infók */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-3">
            <Briefcase className="text-gray-500" />
            <span>{userProfile.job}</span>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Rólam</h3>
            <p className="text-gray-700">{userProfile.bio}</p>
          </div>

          {/* Érdeklődési körök */}
          <div>
            <h3 className="font-semibold mb-2">Érdeklődési körök</h3>
            <div className="flex flex-wrap gap-2">
              {userProfile.interests.map((interest) => (
                <span 
                  key={interest} 
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Galéria */}
          <div>
            <h3 className="font-semibold mb-2">Galéria</h3>
            <div className="flex space-x-3">
              {userProfile.photos.map((photo, index) => (
                <img 
                  key={index} 
                  src={photo} 
                  alt={`Galéria ${index + 1}`} 
                  onClick={() => handleImageClick(photo)}
                  className="w-24 h-24 object-cover rounded-lg cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profilom</h1>
        <button 
          onClick={handleEditProfile}
          className="text-blue-500 hover:bg-blue-100 p-2 rounded-full"
        >
          <Edit2 size={24} />
        </button>
      </div>

      {renderProfileContent()}

      {/* Képnagyító modál */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-full max-h-full">
            <img 
              src={selectedImage} 
              alt="Nagyított kép" 
              className="max-w-full max-h-screen object-contain"
            />
            <button 
              className="absolute top-4 right-4 bg-white rounded-full p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;