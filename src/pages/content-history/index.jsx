import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import FilterControls from './components/FilterControls';
import ContentCard from './components/ContentCard';
import ContentDetailModal from './components/ContentDetailModal';
import BulkActions from './components/BulkActions';
import EmptyState from './components/EmptyState';

import Button from '../../components/ui/Button';

const ContentHistory = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedCraftType, setSelectedCraftType] = useState('');
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  // Mock content history data
  const mockContentHistory = [
    {
      id: 1,
      craftType: 'Pottery',
      keywords: ['traditional', 'handmade'],
      language: 'en',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      createdAt: '2025-01-15T10:30:00Z',
      productStory: `This exquisite piece of traditional pottery represents centuries of craftsmanship passed down through generations. Each curve and detail is meticulously shaped by skilled hands, using techniques that have remained unchanged for hundreds of years.\n\nThe clay used in this creation is sourced from local riverbanks, known for its unique mineral composition that gives the pottery its distinctive strength and beautiful natural color. The artisan who crafted this piece learned the art from their grandmother, who was renowned in the village for her exceptional pottery skills.\n\nEvery piece tells a story of cultural heritage, patience, and dedication to preserving ancient traditions in our modern world.`,
      socialCaption: `🏺 Witness the magic of traditional pottery! Each piece is a testament to centuries-old craftsmanship. ✨\n\n#TraditionalPottery #HandmadeCrafts #CulturalHeritage #ArtisanMade #IndianCrafts #PotteryArt #HandcraftedWithLove #TraditionalArt #CraftedByHand #HeritageArt`,
      culturalContext: `Pottery making in India dates back to the Indus Valley Civilization (3300-1300 BCE), making it one of the world's oldest crafts. This particular style originates from the northern regions of India, where artisans have perfected the technique over millennia.\n\nThe craft is deeply embedded in Indian culture, with pottery being essential for daily life, religious ceremonies, and festivals. The traditional wheel used, called a 'chak', is operated by foot, allowing the potter's hands to remain free to shape the clay.\n\nThis art form represents the sustainable practices of our ancestors, using only natural materials and techniques that are environmentally friendly.`
    },
    {
      id: 2,
      craftType: 'Textiles',
      keywords: ['weaving', 'silk'],
      language: 'hi',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400',
      createdAt: '2025-01-14T14:20:00Z',
      productStory: `यह अद्भुत रेशमी वस्त्र भारतीय बुनकरों की पारंपरिक कलाकारी का प्रतीक है। प्रत्येक धागा सावधानीपूर्वक चुना गया है और हाथों से बुना गया है।\n\nइस वस्त्र में प्रयुक्त रेशम प्राकृतिक रूप से रंगा गया है, जो इसे एक अनूठी चमक और मुलायमता प्रदान करता है। बुनकर ने इस कृति को बनाने में महीनों का समय लगाया है।\n\nयह वस्त्र न केवल सुंदरता का प्रतीक है, बल्कि हमारी समृद्ध सांस्कृतिक विरासत का भी प्रतिनिधित्व करता है।`,
      socialCaption: `🧵 पारंपरिक रेशमी बुनाई की अद्भुत कलाकारी! हर धागे में छुपी है सदियों पुरानी परंपरा। ✨\n\n#पारंपरिकवस्त्र #हस्तनिर्मित #रेशमीकपड़ा #भारतीयशिल्प #बुनकरकला #हस्तकला #सांस्कृतिकविरासत #पारंपरिककला #हाथसेबना #विरासतीकला`,
      culturalContext: `भारत में वस्त्र बुनाई की परंपरा हजारों साल पुरानी है। यह कला मुख्यतः दक्षिण भारत के क्षेत्रों में विकसित हुई, जहाँ रेशम के कीड़े प्राकृतिक रूप से पाए जाते हैं।\n\nपारंपरिक बुनाई तकनीक में हैंडलूम का उपयोग किया जाता है, जो पूर्णतः मानव शक्ति से संचालित होता है। यह तकनीक पर्यावरण के अनुकूल है और स्थायी विकास को बढ़ावा देती है।\n\nयह कला न केवल आर्थिक आधार प्रदान करती है बल्कि हमारी सांस्कृतिक पहचान को भी संजोए रखती है।`
    },
    {
      id: 3,
      craftType: 'Woodwork',
      keywords: ['carving', 'sculpture'],
      language: 'ta',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      createdAt: '2025-01-13T09:15:00Z',
      productStory: `இந்த அழகான மரவேலைப்பாடு தமிழ் கலைஞர்களின் பாரம்பரிய திறமையின் சாட்சியாகும். ஒவ்வொரு வடிவமும் கவனமாக செதுக்கப்பட்டு, பல தலைமுறைகளாக கடத்தப்பட்ட நுட்பங்களைப் பயன்படுத்தி உருவாக்கப்பட்டுள்ளது।\n\nஇந்த கலைப்பொருளில் பயன்படுத்தப்பட்ட மரம் உள்ளூர் காடுகளில் இருந்து கவனமாக தேர்ந்தெடுக்கப்பட்டது. கலைஞர் பல மாதங்கள் உழைத்து இந்த அற்புதமான படைப்பை உருவாக்கியுள்ளார்।\n\nஇது வெறும் அலங்காரப் பொருள் மட்டுமல்ல, மாறாக நமது பண்டைய கலாச்சாரத்தின் வெளிப்பாடாகும்.`,
      socialCaption: `🪵 பாரம்பரிய மரவேலைப்பாட்டின் அற்புதம்! ஒவ்வொரு செதுக்கலிலும் வரலாறு பேசுகிறது. ✨\n\n#பாரம்பரியமரவேலை #கைவேலைப்பாடு #தமிழ்கலை #கலைஞர்படைப்பு #மரச்சிற்பம் #பாரம்பரியகலை #கைத்தொழில் #கலாச்சாரபாரம்பரியம் #தமிழ்பண்பாடு #கலைநயம்`,
      culturalContext: `தமிழகத்தில் மரவேலைப்பாடு ஆயிரக்கணக்கான ஆண்டுகளாக நடைமுறையில் உள்ளது. இந்த கலை முக்கியமாக கோயில் கட்டுமானம் மற்றும் மத சிற்பங்களுக்காக வளர்ச்சி பெற்றது.\n\nபாரம்பரிய கருவிகளான உளி, சுத்தியல் மற்றும் கத்தி போன்றவற்றைப் பயன்படுத்தி இந்த கலை செய்யப்படுகிறது. ஒவ்வொரு பகுதியும் கலைஞரின் கைகளால் மட்டுமே வடிவமைக்கப்படுகிறது.\n\nஇந்த கலை நமது கலாச்சார அடையாளத்தை பாதுகாக்கும் முக்கியமான வழிமுறையாகும்.`
    },
    {
      id: 4,
      craftType: 'Metalwork',
      keywords: ['brass', 'traditional'],
      language: 'en',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      createdAt: '2025-01-12T16:45:00Z',
      productStory: `This magnificent brass artwork showcases the exceptional skill of traditional Indian metalworkers. Each intricate detail has been carefully hammered and shaped using techniques that have been refined over centuries.\n\nThe brass used in this creation is of the highest quality, sourced from trusted suppliers who understand the importance of material purity in traditional crafts. The artisan spent countless hours perfecting every curve and pattern, ensuring that each element contributes to the overall harmony of the piece.\n\nThis artwork represents not just decorative beauty, but also the functional excellence that characterizes Indian metalwork, where form and function unite in perfect balance.`,
      socialCaption: `✨ Behold the brilliance of traditional brass craftsmanship! Every detail tells a story of dedication and skill. 🔥\n\n#BrassCrafts #TraditionalMetalwork #IndianArtisans #HandcraftedArt #MetalArt #CulturalHeritage #ArtisanSkills #TraditionalCrafts #HandmadeInIndia #HeritageMetalwork`,
      culturalContext: `Metalworking in India has a history spanning over 4,000 years, with evidence found in the Harappan civilization. Brass work, in particular, flourished during the Mughal period and became an integral part of Indian decorative arts.\n\nTraditional techniques like repoussé (hammering from the reverse side) and chasing (hammering from the front) are still used today. These methods require years of training and exceptional skill to master.\n\nBrass items hold special significance in Indian culture, often used in religious ceremonies, festivals, and as symbols of prosperity and good fortune in Indian households.`
    },
    {
      id: 5,
      craftType: 'Painting',
      keywords: ['miniature', 'traditional'],
      language: 'hi',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
      createdAt: '2025-01-11T11:30:00Z',
      productStory: `यह सुंदर लघु चित्रकारी भारतीय पारंपरिक कला की उत्कृष्ट मिसाल है। प्रत्येक रंग और रेखा को अत्यधिक सावधानी और धैर्य के साथ चित्रित किया गया है।\n\nइस चित्र में प्रयुक्त रंग प्राकृतिक स्रोतों से तैयार किए गए हैं, जैसे कि खनिज, पौधे और कीमती पत्थर। कलाकार ने बारीक ब्रश का उपयोग करके हर विवरण को जीवंत बनाया है।\n\nयह कलाकृति न केवल दृश्य सुंदरता प्रदान करती है, बल्कि हमारी समृद्ध कलात्मक परंपरा का भी संरक्षण करती है।`,
      socialCaption: `🎨 पारंपरिक लघु चित्रकारी की अनुपम कलाकारी! हर रंग में छुपी है सदियों की परंपरा। ✨\n\n#लघुचित्रकारी #पारंपरिककला #भारतीयचित्रकला #हस्तनिर्मितकला #चित्रकारी #कलाकारकीकृति #सांस्कृतिकविरासत #पारंपरिकचित्र #भारतीयकलाकार #विरासतीकला`,
      culturalContext: `भारत में लघु चित्रकारी की परंपरा मुगल काल से शुरू हुई और राजस्थान, पहाड़ी क्षेत्रों में विकसित हुई। यह कला मुख्यतः दरबारी संरक्षण में फली-फूली।\n\nपारंपरिक तकनीक में हाथी दांत, कागज या कपड़े पर बारीक ब्रश से चित्रकारी की जाती है। प्राकृतिक रंगों का उपयोग इन चित्रों की विशेषता है।\n\nयह कला भारतीय इतिहास, पुराण और दैनिक जीवन के दृश्यों को संजोने का महत्वपूर्ण माध्यम रही है।`
    },
    {
      id: 6,
      craftType: 'Jewelry',
      keywords: ['silver', 'ornate'],
      language: 'ta',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
      createdAt: '2025-01-10T13:20:00Z',
      productStory: `இந்த அழகான வெள்ளி நகைகள் தமிழ் நகைக்கலைஞர்களின் பாரம்பரிய திறமையின் சிறந்த எடுத்துக்காட்டு. ஒவ்வொரு வடிவமும் கவனமாக வடிவமைக்கப்பட்டு, பல தலைமுறைகளாக கடத்தப்பட்ட நுட்பங்களைப் பயன்படுத்தி உருவாக்கப்பட்டுள்ளது।\n\nஇந்த நகைகளில் பயன்படுத்தப்பட்ட வெள்ளி தூய்மையானது மற்றும் பாரம்பரிய முறைகளில் சுத்திகரிக்கப்பட்டது. கலைஞர் ஒவ்வொரு வடிவத்தையும் கையால் செதுக்கி, அதன் தனித்துவத்தை உறுதி செய்துள்ளார்।\n\nஇது வெறும் அலங்காரம் மட்டுமல்ல, மாறாக நமது கலாச்சார அடையாளத்தின் வெளிப்பாடாகும்.`,
      socialCaption: `💎 பாரம்பரிய வெள்ளி நகைகளின் அழகு! ஒவ்வொரு வடிவத்திலும் கலைஞரின் திறமை பிரதிபலிக்கிறது. ✨\n\n#பாரம்பரியநகைகள் #வெள்ளிநகைகள் #தமிழ்நகைக்கலை #கைவேலைநகைகள் #பாரம்பரியகலை #நகைக்கலைஞர் #கலாச்சாரபாரம்பரியம் #தமிழ்பண்பாடு #கைத்தொழில் #பாரம்பரியவடிவமைப்பு`,
      culturalContext: `தமிழகத்தில் நகைக்கலை ஆயிரக்கணக்கான ஆண்டுகளாக வளர்ச்சி பெற்று வருகிறது. சங்க காலத்திலிருந்தே தமிழர்கள் நகை அணிவதில் சிறந்து விளங்கினர்.\n\nபாரம்பரிய நகைக்கலையில் மெழுகு வார்ப்பு, கைவேலைப்பாடு மற்றும் பொறிப்பு போன்ற நுட்பங்கள் பயன்படுத்தப்படுகின்றன. ஒவ்வொரு பகுதியும் கலைஞரின் கைகளால் மட்டுமே வடிவமைக்கப்படுகிறது.\n\nநகைகள் தமிழ் கலாச்சாரத்தில் மங்கலத்தின் அடையாளமாகவும், செல்வத்தின் குறியீடாகவும் கருதப்படுகின்றன.`
    }
  ];

  // Load language preference on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  // Filter and sort content
  const filteredContent = useMemo(() => {
    let filtered = mockContentHistory.filter(content => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          content.craftType.toLowerCase().includes(query) ||
          content.keywords.some(keyword => keyword.toLowerCase().includes(query)) ||
          content.productStory.toLowerCase().includes(query) ||
          content.socialCaption.toLowerCase().includes(query) ||
          content.culturalContext.toLowerCase().includes(query);
        
        if (!matchesSearch) return false;
      }

      // Date range filter
      if (dateRange.start || dateRange.end) {
        const contentDate = new Date(content.createdAt);
        if (dateRange.start && contentDate < new Date(dateRange.start)) return false;
        if (dateRange.end && contentDate > new Date(dateRange.end + 'T23:59:59')) return false;
      }

      // Craft type filter
      if (selectedCraftType && content.craftType.toLowerCase() !== selectedCraftType.toLowerCase()) {
        return false;
      }

      // Language filter
      if (selectedLanguageFilter && content.language !== selectedLanguageFilter) {
        return false;
      }

      return true;
    });

    // Sort content
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'craftType':
          return a.craftType.localeCompare(b.craftType);
        default:
          return 0;
      }
    });

    return filtered;
  }, [mockContentHistory, searchQuery, dateRange, selectedCraftType, selectedLanguageFilter, sortBy]);

  const handleSelectItem = (itemId, isSelected) => {
    setSelectedItems(prev => {
      if (isSelected) {
        return [...prev, mockContentHistory.find(item => item.id === itemId)];
      } else {
        return prev.filter(item => item.id !== itemId);
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedItems(filteredContent);
  };

  const handleDeselectAll = () => {
    setSelectedItems([]);
  };

  const handleViewContent = (content) => {
    setSelectedContent(content);
    setIsDetailModalOpen(true);
  };

  const handleCopyContent = async (content, type = 'All Content') => {
    try {
      let textToCopy = '';
      if (type === 'All Content') {
        textToCopy = `${content.productStory}\n\n${content.socialCaption}\n\n${content.culturalContext}`;
      } else {
        textToCopy = content[type.toLowerCase().replace(' ', '')];
      }
      
      await navigator.clipboard.writeText(textToCopy);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy content: ', err);
    }
  };

  const handleRegenerateContent = (content) => {
    // Navigate to dashboard with pre-filled parameters
    // This would typically use React Router's navigate function 
    console.log('Regenerating content with parameters:', {
      craftType: content.craftType,
      keywords: content.keywords,
      language: content.language
    });
  };

  const handleDeleteContent = (contentId) => {
    // In a real app, this would make an API call
    console.log('Deleting content:', contentId);
  };

  const handleBulkDelete = () => {
    // In a real app, this would make an API call
    console.log('Bulk deleting:', selectedItems.map(item => item.id));
    setSelectedItems([]);
  };

  const handleBulkExport = () => {
    // Create export data
    const exportData = selectedItems.map(item => ({
      craftType: item.craftType,
      keywords: item.keywords.join(', '),
      language: item.language,
      createdAt: item.createdAt,
      productStory: item.productStory,
      socialCaption: item.socialCaption,
      culturalContext: item.culturalContext
    }));

    // Convert to JSON and download
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `content-history-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setDateRange({ start: '', end: '' });
    setSelectedCraftType('');
    setSelectedLanguageFilter('');
  };

  const hasActiveFilters = searchQuery || dateRange.start || dateRange.end || 
                          selectedCraftType || selectedLanguageFilter;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Content History - KalaConnect AI</title>
        <meta name="description" content="Access and manage your previously generated marketing content for traditional crafts" />
      </Helmet>

      <Header />

      <main className="pt-16 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
                  Content History
                </h1>
                <p className="text-text-secondary">
                  Access, manage, and reuse your previously generated marketing content
                </p>
              </div>

              {filteredContent.length > 0 && (
                <div className="flex items-center space-x-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="craftType">By Craft Type</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Filter Controls */}
          <FilterControls
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            selectedCraftType={selectedCraftType}
            onCraftTypeChange={setSelectedCraftType}
            selectedLanguage={selectedLanguageFilter}
            onLanguageChange={setSelectedLanguageFilter}
            onClearFilters={handleClearFilters}
            totalResults={filteredContent.length}
          />

          {/* Bulk Actions */}
          {selectedItems.length > 0 && (
            <BulkActions
              selectedItems={selectedItems}
              onSelectAll={handleSelectAll}
              onDeselectAll={handleDeselectAll}
              onBulkDelete={handleBulkDelete}
              onBulkExport={handleBulkExport}
              totalItems={filteredContent.length}
            />
          )}

          {/* Content Grid */}
          {filteredContent.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredContent.map((content) => (
                <ContentCard
                  key={content.id}
                  content={content}
                  onView={handleViewContent}
                  onCopy={handleCopyContent}
                  onRegenerate={handleRegenerateContent}
                  onDelete={handleDeleteContent}
                  isSelected={selectedItems.some(item => item.id === content.id)}
                  onSelect={handleSelectItem}
                />
              ))}
            </div>
          ) : (
            <EmptyState 
              hasFilters={hasActiveFilters}
              onClearFilters={handleClearFilters}
            />
          )}

          {/* Load More Button (for pagination in real app) */}
          {filteredContent.length > 0 && filteredContent.length >= 6 && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                iconName="ChevronDown"
                iconPosition="right"
                iconSize={18}
              >
                Load More Content
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Content Detail Modal */}
      <ContentDetailModal
        content={selectedContent}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedContent(null);
        }}
        onCopy={handleCopyContent}
        onRegenerate={handleRegenerateContent}
      />
    </div>
  );
};

export default ContentHistory;