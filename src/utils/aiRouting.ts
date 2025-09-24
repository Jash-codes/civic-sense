export const assignDepartment = (description: string): string => {
  const keywords = {
    'Public Works': ['road', 'street', 'pothole', 'sidewalk', 'bridge', 'infrastructure', 'construction'],
    'Sanitation': ['garbage', 'trash', 'waste', 'recycling', 'bin', 'cleanup', 'litter'],
    'Parks & Recreation': ['park', 'playground', 'tree', 'grass', 'sports', 'facility', 'maintenance'],
    'Utilities': ['water', 'electricity', 'power', 'outage', 'sewer', 'gas', 'utility'],
    'Transportation': ['traffic', 'bus', 'transport', 'parking', 'signal', 'sign', 'bike lane'],
    'Public Safety': ['noise', 'safety', 'vandalism', 'crime', 'emergency', 'disturbance'],
    'Health Services': ['health', 'medical', 'clinic', 'hospital', 'hygiene', 'pest'],
    'General Services': []
  };

  const lowerDescription = description.toLowerCase();
  
  for (const [department, words] of Object.entries(keywords)) {
    if (words.some(word => lowerDescription.includes(word))) {
      return department;
    }
  }
  
  return 'General Services';
};