
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  TrendingUp, 
  Target, 
  Globe, 
  Eye, 
  Users, 
  Zap,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';

interface SEOAnalysis {
  overallScore: number;
  titleScore: number;
  descriptionScore: number;
  keywordDensity: number;
  readabilityScore: number;
  recommendations: string[];
  competitiveKeywords: string[];
  trendingTopics: string[];
}

interface BlogSEOAnalyzerProps {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  onSEOUpdate: (suggestions: any) => void;
}

const BlogSEOAnalyzer: React.FC<BlogSEOAnalyzerProps> = ({
  title,
  content,
  excerpt,
  tags,
  onSEOUpdate
}) => {
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeBlogSEO = async () => {
    setIsAnalyzing(true);
    
    // Simulate advanced SEO analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const wordCount = content.split(' ').length;
    const titleLength = title.length;
    const descriptionLength = excerpt.length;
    
    // Calculate scores
    const titleScore = titleLength >= 30 && titleLength <= 60 ? 100 : 
                     titleLength < 30 ? 60 : 40;
    const descriptionScore = descriptionLength >= 120 && descriptionLength <= 160 ? 100 : 
                           descriptionLength < 120 ? 70 : 50;
    const keywordDensity = (tags.length / wordCount) * 100;
    const readabilityScore = Math.min(100, Math.max(50, 100 - (wordCount / 100)));
    
    const overallScore = Math.round(
      (titleScore + descriptionScore + readabilityScore + 
       (keywordDensity > 1 ? 80 : 60)) / 4
    );
    
    const newAnalysis: SEOAnalysis = {
      overallScore,
      titleScore,
      descriptionScore,
      keywordDensity,
      readabilityScore,
      recommendations: [
        titleScore < 90 ? 'Optimize title length (30-60 characters)' : '',
        descriptionScore < 90 ? 'Improve meta description (120-160 characters)' : '',
        keywordDensity < 1 ? 'Add more relevant keywords' : '',
        'Include Kenya tech keywords for local SEO',
        'Add IoT and AI-related terms for technical audience',
        'Use long-tail keywords for better ranking'
      ].filter(Boolean),
      competitiveKeywords: [
        'Kenya tech innovation',
        'IoT development Africa',
        'Youth tech leaders Kenya',
        'African AI developers',
        'Smart agriculture Kenya',
        'Tech startups Nairobi'
      ],
      trendingTopics: [
        'AI in Agriculture',
        'Smart Cities Kenya',
        'FinTech Innovation',
        'Digital Transformation',
        'Youth Entrepreneurship',
        'Sustainable Technology'
      ]
    };
    
    setAnalysis(newAnalysis);
    setIsAnalyzing(false);
    
    // Send suggestions back to parent
    onSEOUpdate({
      suggestedTitle: titleScore < 90 ? `${title} | Kenya Tech Innovation` : title,
      suggestedTags: [...tags, ...newAnalysis.competitiveKeywords.slice(0, 3)],
      suggestedKeywords: newAnalysis.competitiveKeywords
    });
  };

  useEffect(() => {
    if (title && content) {
      analyzeBlogSEO();
    }
  }, [title, content, excerpt]);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 85) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (score >= 70) return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    return <XCircle className="w-4 h-4 text-red-600" />;
  };

  if (isAnalyzing) {
    return (
      <Card className="bg-[#161b22] border-[#30363d]">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="w-5 h-5 mr-2 animate-pulse" />
            AI SEO Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-[#c9d1d9]">Analyzing SEO potential...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) return null;

  return (
    <Card className="bg-[#161b22] border-[#30363d]">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Futuristic SEO Analysis
          </div>
          <Badge variant="outline" className={`${getScoreColor(analysis.overallScore)} border-current`}>
            {analysis.overallScore}/100
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#c9d1d9]">Overall SEO Score</span>
            <span className={`font-bold ${getScoreColor(analysis.overallScore)}`}>
              {analysis.overallScore}%
            </span>
          </div>
          <Progress value={analysis.overallScore} className="h-2" />
        </div>

        {/* Detailed Scores */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#7d8590]">Title Optimization</span>
              <div className="flex items-center space-x-1">
                {getScoreIcon(analysis.titleScore)}
                <span className={`text-sm ${getScoreColor(analysis.titleScore)}`}>
                  {analysis.titleScore}%
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#7d8590]">Description Quality</span>
              <div className="flex items-center space-x-1">
                {getScoreIcon(analysis.descriptionScore)}
                <span className={`text-sm ${getScoreColor(analysis.descriptionScore)}`}>
                  {analysis.descriptionScore}%
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#7d8590]">Readability</span>
              <div className="flex items-center space-x-1">
                {getScoreIcon(analysis.readabilityScore)}
                <span className={`text-sm ${getScoreColor(analysis.readabilityScore)}`}>
                  {analysis.readabilityScore}%
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#7d8590]">Keyword Density</span>
              <span className="text-sm text-[#c9d1d9]">
                {analysis.keywordDensity.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h4 className="text-[#c9d1d9] font-medium mb-3 flex items-center">
            <Target className="w-4 h-4 mr-2" />
            AI Recommendations
          </h4>
          <ul className="space-y-2">
            {analysis.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start text-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-[#7d8590]">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Kenya Tech Keywords */}
        <div>
          <h4 className="text-[#c9d1d9] font-medium mb-3 flex items-center">
            <Globe className="w-4 h-4 mr-2" />
            Kenya Tech Keywords
          </h4>
          <div className="flex flex-wrap gap-2">
            {analysis.competitiveKeywords.map((keyword, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>

        {/* Trending Topics */}
        <div>
          <h4 className="text-[#c9d1d9] font-medium mb-3 flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            Trending in Tech
          </h4>
          <div className="flex flex-wrap gap-2">
            {analysis.trendingTopics.map((topic, index) => (
              <Badge key={index} variant="outline" className="text-xs border-green-500 text-green-400">
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        <Button 
          onClick={analyzeBlogSEO} 
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isAnalyzing}
        >
          <Search className="w-4 h-4 mr-2" />
          Re-analyze SEO
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlogSEOAnalyzer;
