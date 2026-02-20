import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectBasicInfo from '../components/ProjectBasicInfo';
import MediaUpload from '../components/MediaUpload';
import TagsInput from '../components/TagsInput';
import ProjectPreview from '../components/ProjectPreview';
import { ChevronLeft, ChevronRight, Save, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

const UploadProjectPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: null,
    imageFile: null,
    gallery: [],
    demoLink: '',
    videoLink: '',
    tags: []
  });

  // UI state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);


  
    // Get real authenticated user
  const [currentUser, setCurrentUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    // Not logged in - redirect to home
    alert('Please sign in to upload projects');
    window.location.href = '/';
    return;
  }

    setCurrentUser({
      id: session.user.id,
      name: session.user.user_metadata?.name || session.user.email,
      avatar: session.user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${session.user.email}`,
      university: session.user.user_metadata?.university || 'University'
    });
    
    setIsCheckingAuth(false);
  };

  const totalSteps = 3;

    // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="bg-black min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while checking authentication
  if (!currentUser) {
    return (
      <div className="bg-black min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-white text-2xl font-bold mb-4">Please Sign In</h2>
            <p className="text-gray-400 mb-6">You need to be signed in to upload projects</p>
            <a href="/" className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Go to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Handle form data changes
  const handleFormChange = (newData) => {
    setFormData(newData);
    // Clear errors for changed fields
    const changedFields = Object.keys(newData).filter(key => newData[key] !== formData[key]);
    const newErrors = { ...errors };
    changedFields.forEach(field => delete newErrors[field]);
    setErrors(newErrors);
  };

    // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.title || formData.title.trim() === '') {
      newErrors.title = 'Project title is required';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters';
    }

    if (!formData.description || formData.description.trim() === '') {
      newErrors.description = 'Project description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    // Check for EITHER image preview OR imageFile
    if (!formData.image && !formData.imageFile) {
      newErrors.image = 'Cover image is required';
    }

  // Rest of validation...

    // Optional but validated if provided
    if (formData.demoLink && !isValidUrl(formData.demoLink)) {
      newErrors.demoLink = 'Please enter a valid URL';
    }

    if (formData.videoLink && !isValidUrl(formData.videoLink)) {
      newErrors.videoLink = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // URL validation helper
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Handle step navigation
  const nextStep = () => {
    if (currentStep < totalSteps) {
      // Validate current step before moving forward
      if (currentStep === 1) {
        const stepErrors = {};
        if (!formData.title?.trim()) stepErrors.title = 'Required';
        if (!formData.description?.trim()) stepErrors.description = 'Required';
        if (!formData.category) stepErrors.category = 'Required';
        
        if (Object.keys(stepErrors).length > 0) {
          setErrors(stepErrors);
          return;
        }
      }
      
        if (currentStep === 2) {
          if (!formData.image && !formData.imageFile) {
            setErrors({ image: 'Cover image is required' });
            return;
          }
        }

      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Save as draft
  const saveDraft = async () => {
    console.log('Saving draft...', formData);
    // TODO: Save to local storage or API
    alert('Draft saved successfully!');
  };
// Submit form
const handleSubmit = async () => {
  // Validate entire form
  if (!validateForm()) {
    alert('Please fill in all required fields correctly');
    return;
  }

  setIsSubmitting(true);

  try {
    // Upload main image to Supabase Storage
    let imageUrl = formData.image;
    
    if (formData.imageFile) {
      const fileName = `${Date.now()}_${formData.imageFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(fileName, formData.imageFile);

      if (uploadError) {
        console.error('Image upload error:', uploadError);
        alert('Error uploading image. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('project-images')
        .getPublicUrl(fileName);

      imageUrl = urlData.publicUrl;
    }

    // Upload gallery images (if any)
    const galleryUrls = [];
    if (formData.gallery && formData.gallery.length > 0) {
      for (let i = 0; i < formData.gallery.length; i++) {
        // Gallery images are already base64, we'd need to convert them
        // For now, we'll skip gallery upload - can add later
      }
    }

    // Get current user (we'll add proper auth later)
   const userId = currentUser.id; // Use real authenticated user ID

    // Insert project into database
    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          image: imageUrl,
          gallery: galleryUrls,
          demo_link: formData.demoLink || null,
          video_link: formData.videoLink || null,
          tags: formData.tags || [],
          creator_id: userId,
          creator_name: currentUser.name,
          creator_avatar: currentUser.avatar,
          creator_university: currentUser.university,
          likes: 0,
          views: 0
        }
      ])
      .select();

    if (error) {
      console.error('Database insert error:', error);
      alert('Error saving project. Please try again.');
      setIsSubmitting(false);
      return;
    }

    // Success!
    alert('Project uploaded successfully! 🎉');
    
    // Redirect to the new project page
    if (data && data[0]) {
      window.location.href = `/project/${data[0].id}`;
    } else {
      window.location.href = '/discover';
    }
    
  } catch (error) {
    console.error('Error uploading project:', error);
    alert('Error uploading project. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      {/* Main Content */}
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Upload Your <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">Project</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Share your innovation with the world
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between max-w-2xl">
              {[1, 2, 3].map((step) => (
                <React.Fragment key={step}>
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      currentStep >= step
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-800 text-gray-500 border border-gray-700'
                    }`}>
                      {step}
                    </div>
                    <span className={`text-sm mt-2 ${
                      currentStep >= step ? 'text-white' : 'text-gray-500'
                    }`}>
                      {step === 1 && 'Basic Info'}
                      {step === 2 && 'Media'}
                      {step === 3 && 'Tags & Preview'}
                    </span>
                  </div>
                  {step < 3 && (
                    <div className={`flex-1 h-1 mx-4 rounded ${
                      currentStep > step ? 'bg-orange-500' : 'bg-gray-800'
                    }`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Form Content - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column - Form Sections */}
            <div className="space-y-8">
              
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
                  <ProjectBasicInfo
                    formData={formData}
                    onChange={handleFormChange}
                    errors={errors}
                  />
                </div>
              )}

              {/* Step 2: Media Upload */}
              {currentStep === 2 && (
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
                  <MediaUpload
                    formData={formData}
                    onChange={handleFormChange}
                    errors={errors}
                  />
                </div>
              )}

              {/* Step 3: Tags */}
              {currentStep === 3 && (
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
                  <TagsInput
                    formData={formData}
                    onChange={handleFormChange}
                    errors={errors}
                  />
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2 bg-gray-800 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700"
                >
                  <ChevronLeft size={20} />
                  <span>Previous</span>
                </button>

                <button
                  onClick={saveDraft}
                  className="flex items-center space-x-2 bg-gray-800 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all border border-gray-700"
                >
                  <Save size={20} />
                  <span>Save Draft</span>
                </button>

                {currentStep < totalSteps ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all"
                  >
                    <span>Next</span>
                    <ChevronRight size={20} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Publishing...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Publish Project</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Right Column - Preview (Sticky) */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
                <ProjectPreview
                  formData={formData}
                  currentUser={currentUser}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UploadProjectPage;