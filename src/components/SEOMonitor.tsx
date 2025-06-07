
import { useState, useEffect } from 'react';
import { Search, TrendingUp, AlertTriangle, CheckCircle, Eye, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SEOMetrics {
  title: {
    length: number;
    status: 'good' | 'warning' | 'error';
    message: string;
  };
  description: {
    length: number;
    status: 'good' | 'warning' | 'error';
    message: string;
  };
  headings: {
    h1Count: number;
    structure: string[];
    status: 'good' | 'warning' | 'error';
    message: string;
  };
  images: {
    total: number;
    withoutAlt: number;
    status: 'good' | 'warning' | 'error';
    message: string;
  };
  links: {
    internal: number;
    external: number;
    status: 'good' | 'warning' | 'error';
    message: string;
  };
  performance: {
    score: number;
    recommendations: string[];
  };
}

const SEOMonitor = () => {
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const analyzePageSEO = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      // Analyze title
      const titleElement = document.querySelector('title');
      const titleLength = titleElement?.textContent?.length || 0;
      const titleStatus = titleLength >= 30 && titleLength <= 60 ? 'good' : 
                         titleLength < 30 ? 'warning' : 'error';
      
      // Analyze meta description
      const descElement = document.querySelector('meta[name="description"]');
      const descLength = descElement?.getAttribute('content')?.length || 0;
      const descStatus = descLength >= 120 && descLength <= 160 ? 'good' : 
                        descLength < 120 ? 'warning' : 'error';
      
      // Analyze headings
      const h1s = document.querySelectorAll('h1');
      const h2s = document.querySelectorAll('h2');
      const h3s = document.querySelectorAll('h3');
      const headingStructure = [
        `H1: ${h1s.length}`,
        `H2: ${h2s.length}`,
        `H3: ${h3s.length}`
      ];
      const headingStatus = h1s.length === 1 ? 'good' : 'error';
      
      // Analyze images
      const images = document.querySelectorAll('img');
      const imagesWithoutAlt = Array.from(images).filter(img => !img.alt || img.alt.trim() === '');
      const imageStatus = imagesWithoutAlt.length === 0 ? 'good' : 
                         imagesWithoutAlt.length <= 2 ? 'warning' : 'error';
      
      // Analyze links
      const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="#"]');
      const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="petermuraya"])');
      const linkStatus = internalLinks.length >= 3 ? 'good' : 'warning';
      
      // Calculate performance score
      const scores = [titleStatus, descStatus, headingStatus, imageStatus, linkStatus];
      const goodCount = scores.filter(s => s === 'good').length;
      const performanceScore = Math.round((goodCount / scores.length) * 100);
      
      const newMetrics: SEOMetrics = {
        title: {
          length: titleLength,
          status: titleStatus,
          message: titleStatus === 'good' ? 'Title length is optimal' : 
                  titleStatus === 'warning' ? 'Title is too short' : 'Title is too long'
        },
        description: {
          length: descLength,
          status: descStatus,
          message: descStatus === 'good' ? 'Meta description length is optimal' :
                  descStatus === 'warning' ? 'Meta description is too short' : 'Meta description is too long'
        },
        headings: {
          h1Count: h1s.length,
          structure: headingStructure,
          status: headingStatus,
          message: headingStatus === 'good' ? 'Heading structure is optimal' : 'Multiple or missing H1 tags detected'
        },
        images: {
          total: images.length,
          withoutAlt: imagesWithoutAlt.length,
          status: imageStatus,
          message: imageStatus === 'good' ? 'All images have alt text' : 
                  `${imagesWithoutAlt.length} images missing alt text`
        },
        links: {
          internal: internalLinks.length,
          external: externalLinks.length,
          status: linkStatus,
          message: linkStatus === 'good' ? 'Good internal linking structure' : 'Consider adding more internal links'
        },
        performance: {
          score: performanceScore,
          recommendations: [
            'Enable image lazy loading',
            'Minimize JavaScript bundles',
            'Optimize images for web',
            'Use modern image formats (WebP)',
            'Implement service worker caching'
          ]
        }
      };
      
      setMetrics(newMetrics);
      setIsAnalyzing(false);
      
      toast({
        title: "SEO Analysis Complete",
        description: `Performance Score: ${performanceScore}/100`,
      });
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  useEffect(() => {
    analyzePageSEO();
  }, []);

  if (!metrics) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>SEO Monitor</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Analyzing SEO metrics...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>SEO Performance Monitor</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-lg font-bold">
              {metrics.performance.score}/100
            </Badge>
            <Button onClick={analyzePageSEO} disabled={isAnalyzing} size="sm">
              {isAnalyzing ? 'Analyzing...' : 'Re-analyze'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Title Analysis */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-3">
            {getStatusIcon(metrics.title.status)}
            <div>
              <h3 className="font-medium">Title Tag</h3>
              <p className={`text-sm ${getStatusColor(metrics.title.status)}`}>
                {metrics.title.message} ({metrics.title.length} characters)
              </p>
            </div>
          </div>
        </div>

        {/* Description Analysis */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-3">
            {getStatusIcon(metrics.description.status)}
            <div>
              <h3 className="font-medium">Meta Description</h3>
              <p className={`text-sm ${getStatusColor(metrics.description.status)}`}>
                {metrics.description.message} ({metrics.description.length} characters)
              </p>
            </div>
          </div>
        </div>

        {/* Headings Analysis */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-3">
            {getStatusIcon(metrics.headings.status)}
            <div>
              <h3 className="font-medium">Heading Structure</h3>
              <p className={`text-sm ${getStatusColor(metrics.headings.status)}`}>
                {metrics.headings.message}
              </p>
              <div className="flex space-x-2 mt-1">
                {metrics.headings.structure.map((item, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Images Analysis */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-3">
            {getStatusIcon(metrics.images.status)}
            <div>
              <h3 className="font-medium">Image Optimization</h3>
              <p className={`text-sm ${getStatusColor(metrics.images.status)}`}>
                {metrics.images.message}
              </p>
              <p className="text-xs text-gray-500">
                {metrics.images.total} total images, {metrics.images.withoutAlt} without alt text
              </p>
            </div>
          </div>
        </div>

        {/* Links Analysis */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-3">
            {getStatusIcon(metrics.links.status)}
            <div>
              <h3 className="font-medium">Internal Linking</h3>
              <p className={`text-sm ${getStatusColor(metrics.links.status)}`}>
                {metrics.links.message}
              </p>
              <p className="text-xs text-gray-500">
                {metrics.links.internal} internal, {metrics.links.external} external links
              </p>
            </div>
          </div>
        </div>

        {/* Performance Recommendations */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-3 flex items-center">
            <Globe className="w-4 h-4 mr-2" />
            Performance Recommendations
          </h3>
          <ul className="space-y-1">
            {metrics.performance.recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SEOMonitor;
