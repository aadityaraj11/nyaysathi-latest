import React, { useState } from 'react';
import { BookOpen, Clipboard, Gavel, Info, Search, Shield, User, Users } from 'lucide-react';

import Navbar from '@/components/layout/Navbar';
import Container from '../../components/ui/container';

import RightsCategory, { RightsCategoryProps  } from '@/components/rights/RightsCategory';
import RightsSidebar from '@/components/rights/RightsSidebar';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

// Mock rights data
const rightsCategories: Omit<RightsCategoryProps, 'icon'>[] = [
//ADOPTION
  {
    id: "Adoption Rights",
    title: "Adoption Rights",
    description: "Fundamental rights guaranteed by the Indian Constitution",
    rights: [
      {
        id: "Adoption in Hindus",
        title: "Adoption in Hindus",
        description: "Adoption in the Hindus is covered by The Hindu Adoptions Act and after the coming of this Act all adoptions can be made in accordance with this Act. It came into effect from 21st December, 1956.",
        sections: [
          {
            title: "Requirements for a valid adoption",
            content: `An adoption is valid only if all parties are legally capable, the adoption involves actual giving and taking, and the *datta homam* ceremony is performed, though the ceremony is not always essential.`
          },
          {
            title: "Who may adopt",
            content: "A male or female Hindu of sound mind and not a minor can adopt a child, but a married person requires the consent of their spouse unless the spouse is deceased, has renounced the world, ceased to be Hindu, or has been declared of unsound mind by a court."
          },
          {
            title: "The person giving a child in adoption",
            content: "A person can be adopted only if they are a Hindu, unmarried, under 15 years of age, and have not been previously adopted, unless custom permits otherwise."
          }
        ],
        relevantCases: [
          "https://indiankanoon.org/docfragment/1450589/?formInput=hindu%20adoption%20%20%20doctypes%3A%20judgments",
          "https://indiankanoon.org/docfragment/17088360/?formInput=hindu%20adoption%20%20%20doctypes%3A%20judgments"
        ],
        keyExceptions: [
          "Spousal consent is not required if the spouse is deceased, renounced the world, ceased to be Hindu, or is of unsound mind.",
          "The religious ceremony (datta homan) is not mandatory if custom does not require it."
        ]
      },
      {
        id: "Adoption in other religions",
        title: "Adoption in other religions",
        description: "While not explicitly mentioned in the Constitution, the Supreme Court has recognized a right to privacy derived from several constitutional amendments.",
        sections: [
          {
            title: "Personal Decisions",
            content: "The right to privacy protects individuals' ability to make personal decisions about their bodies, relationships, and families without government interference."
          },
          {
            title: "Information Privacy",
            content: "The Fourth Amendment provides some protection against unreasonable government collection of personal information, though this protection is limited in many contexts."
          },
          {
            title: "Medical Privacy",
            content: "While constitutional privacy rights protect some medical decisions, most medical privacy is protected by statutes like HIPAA rather than by constitutional law."
          }
        ],
        relevantCases: [
          "Griswold v. Connecticut (1965) - Recognized right to privacy in marital relationships and contraceptive use",
          "Roe v. Wade (1973) - Found privacy right included abortion decisions (partially overturned by Dobbs v. Jackson Women's Health Organization)",
          "Lawrence v. Texas (2003) - Struck down laws criminalizing consensual same-sex intimate conduct"
        ],
        keyExceptions: [
          "Public records and information shared with third parties often have reduced privacy protection",
          "Government interests in public safety can override privacy in some circumstances",
          "Privacy rights vary significantly across different contexts and continue to evolve"
        ]
      },
      
    ]
  },
//APPEALS
  {
    id: "Appeals",
    title: "Appeals",
    description: "Protections for consumers in the marketplace",
    rights: [
      {
        id: "Introduction to Appeals",
        title: "Introduction to Appeals",
        description: "You have the right to be protected against products, services, and production processes that may be hazardous to health or life.",
        sections: [
          {
            title: "Product Safety Standards",
            content: "The Consumer Product Safety Commission (CPSC) establishes and enforces safety standards for over 15,000 types of consumer products."
          },
          {
            title: "Food Safety",
            content: "The FDA regulates food safety, while the USDA oversees meat, poultry, and egg products. These agencies enforce standards to prevent contamination and ensure proper labeling."
          },
          {
            title: "Automobile Safety",
            content: "The National Highway Traffic Safety Administration (NHTSA) sets and enforces safety performance standards for motor vehicles and equipment."
          }
        ],
        relevantCases: [
          "Grimshaw v. Ford Motor Co. (1981) - The 'Ford Pinto case' established significant precedent for holding manufacturers liable for dangerous design defects",
          "Escola v. Coca-Cola Bottling Co. (1944) - Established the doctrine of strict liability for defective products"
        ],
        keyExceptions: [
          "Products with obvious dangers or used in unintended ways may not be covered",
          "Products that carry appropriate warnings about potential hazards",
          "Some state laws include 'assumption of risk' defenses"
        ]
      },
      {
        id: "Supreme Court Appeals",
        title: "Supreme Court Appeals",
        description: "You have the right to accurate information needed to make informed choices in the marketplace.",
        sections: [
          {
            title: "Truth in Advertising",
            content: "The Federal Trade Commission (FTC) prohibits deceptive or misleading advertising, requiring that claims must be truthful, not misleading, and supported by evidence."
          },
          {
            title: "Financial Disclosure",
            content: "Laws like the Truth in Lending Act require clear disclosure of loan terms, interest rates, and fees before consumers commit to financial agreements."
          },
          {
            title: "Food and Drug Labeling",
            content: "FDA regulations require detailed nutritional information, ingredient lists, and health claims to be accurate and substantiated by scientific evidence."
          }
        ],
        relevantCases: [
          "FTC v. Colgate-Palmolive Co. (1965) - Established that visual demonstrations in advertisements must accurately represent the product's capabilities",
          "Williams v. Gerber Products Co. (2008) - Found that 'reasonable consumers' can be misled by packaging even if technically accurate"
        ],
        keyExceptions: [
          "Puffery (obvious exaggeration) is generally allowed in advertising",
          "Some information may be withheld for legitimate trade secrets",
          "Different disclosure standards apply in different industries and contexts"
        ]
      },
      {
        id: "High Court Appeals",
        title: "High Court Appeals",
        description: "You have the right to select from a range of products and services at competitive prices in a fair marketplace.",
        sections: [
          {
            title: "Antitrust Protection",
            content: "Federal laws like the Sherman Antitrust Act and Clayton Act prohibit monopolies, price-fixing, and other anti-competitive practices that limit consumer choice."
          },
          {
            title: "Contract Fairness",
            content: "Laws protect against unfair contract terms, providing cooling-off periods for certain purchases and prohibiting unconscionable clauses in contracts."
          },
          {
            title: "Freedom from Coercion",
            content: "Consumers have the right to make purchases free from high-pressure tactics, deception, or undue influence. Many states have specific regulations against such practices."
          }
        ],
        relevantCases: [
          "United States v. Microsoft Corp. (2001) - Major antitrust case addressing monopolistic practices that limited consumer choice in operating systems and web browsers",
          "Leegin Creative Leather Products v. PSKS (2007) - Addressed manufacturers' ability to set minimum retail prices"
        ],
        keyExceptions: [
          "Natural monopolies (utilities) are often regulated rather than prohibited",
          "Limited options may exist in rural or underserved markets",
          "Some industries have exemptions from certain antitrust laws"
        ]
      },
    ]
  },
//CONSUMER RIGHTS
  {
    id: "Consumer Rights",
    title: "Consumer Rights",
    description: "Rights in the workplace and employment relationships",
    rights: [
      {
        id: "Food Adulteration",
        title: "Food Adulteration",
        description: "Under the Fair Labor Standards Act (FLSA), most employees are entitled to receive at least the federal minimum wage and overtime pay at 1.5 times their regular rate for hours worked beyond 40 in a workweek. Some states have higher minimum wage requirements."
      },
      {
        id: "Consumer Protection Act",
        title: "Consumer Protection Act",
        description: "The Occupational Safety and Health Act (OSHA) requires employers to provide a workplace free from recognized hazards. You have the right to request an OSHA inspection, receive information about hazards, and be protected from retaliation for reporting unsafe conditions."
      },
      {
        id: "Medicinal Negligence",
        title: "Medical Negligence",
        description: "Federal laws prohibit employment discrimination based on race, color, religion, sex (including pregnancy, gender identity, and sexual orientation), national origin, age (40 or older), disability, or genetic information. These protections apply to hiring, firing, promotions, training, and other employment aspects."
      },
    ]
  },
//FAMILY LAW
  {
    id: "Family Law",
    title: "Family Law ",
    description: "Rights relating to family relationships and matters",
    rights: [
      {
        id: "marriage-divorce",
        title: "Marriage and Divorce",
        description: "All adults have the right to marry regardless of gender. In divorce, rights typically include equitable distribution of property (or community property in some states), potential spousal support, and parental rights regarding children from the marriage."
      },
      {
        id: "child-custody",
        title: "Child Custody and Support",
        description: "When parents separate, child custody decisions are based on the best interests of the child. Most parents have rights to visitation or shared custody. Child support is typically required from the non-custodial parent based on income and needs."
      },
      {
        id: "domestic-violence",
        title: "Domestic Violence Protection",
        description: "Victims of domestic violence have the right to seek protective orders prohibiting contact by abusers. Many jurisdictions provide emergency ex parte orders for immediate protection, followed by longer-term orders after a hearing."
      },
    ]
  }
];

const KnowYourRights: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query) {
      toast({
        title: "Search Results",
        description: `Showing results for "${query}"`,
      });
    }
  };

  const renderCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'constitutional':
        return <Gavel className="h-6 w-6 text-legal-primary" />;
      case 'consumer':
        return <Clipboard className="h-6 w-6 text-legal-primary" />;
      case 'employment':
        return <User className="h-6 w-6 text-legal-primary" />;
      case 'housing':
        return <Shield className="h-6 w-6 text-legal-primary" />;
      case 'family':
        return <Users className="h-6 w-6 text-legal-primary" />;
      case 'criminal':
        return <Gavel className="h-6 w-6 text-legal-primary" />;
      default:
        return <Info className="h-6 w-6 text-legal-primary" />;
    }
  };

  // Filter categories based on search query if one exists
  const filteredCategories = searchQuery
    ? rightsCategories.map(category => ({
        ...category,
        rights: category.rights.filter(right =>
          right.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          right.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.rights.length > 0)
    : rightsCategories;
    const clickFun = () => {
      window.location.href = "/legal-library";
    }
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero section */}
        <section className="bg-legal-primary text-white py-12 md:py-20">
          <Container className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Know Your Rights</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 mb-8">
              Understand the legal protections and rights you're entitled to in various situations.
            </p>
            
          </Container>
        </section>

        {/* Main content section */}
        <Container className="py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full lg:w-1/4">
              <div className="lg:sticky lg:top-24">
                <RightsSidebar activeCategory={activeCategory} className="mb-6" />
                
                <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6 text-center">
                  <BookOpen className="h-8 w-8 text-legal-secondary mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Need In-Depth Legal Information?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Access our comprehensive legal resource library for more detailed information.
                  </p>
                  
                  <Button onClick={clickFun} className="bg-legal-primary hover:bg-legal-secondary">
                    
                      View Legal Library
                    
                  </Button>
                
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="w-full lg:w-3/4">
              {filteredCategories.length > 0 ? (
                <div className="space-y-8">
                  {filteredCategories.map(category => (
                    <RightsCategory
                      key={category.id}
                      {...category}
                      icon={renderCategoryIcon(category.id)}
                      className="scroll-mt-24"
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 px-4">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    We couldn't find any rights information matching your search. Please try different keywords or browse categories.
                  </p>
                </div>
              )}
              
              <div className="bg-legal-muted border border-legal-accent rounded-lg p-6 mt-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Disclaimer</h3>
                <p className="text-gray-700">
                  This information provides general legal information but does not constitute legal advice. For advice tailored to your specific situation, please consult with a qualified attorney.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default KnowYourRights;