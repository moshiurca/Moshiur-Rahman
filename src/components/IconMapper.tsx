import React from 'react';
import {
  Award,
  Box,
  Brain,
  Briefcase,
  Building2,
  Camera,
  Coffee,
  Cog,
  Compass,
  Cpu,
  Droplets,
  FileCode2,
  FileSpreadsheet,
  FileText,
  FolderCog,
  FolderGit2,
  FolderOpen,
  Globe,
  Layers,
  LayoutGrid,
  Monitor,
  Palette,
  PencilRuler,
  Printer,
  Ruler,
  Settings,
  Sparkles,
  Volume2,
} from 'lucide-react';

interface IconMapperProps {
  name: string;
  className?: string;
}

export const PortfolioIcon: React.FC<IconMapperProps> = ({
  name,
  className = 'w-5 h-5',
}) => {
  switch (name) {
    case 'box':
      return <Box className={className} />;
    case 'draft':
      return <Compass className={className} />;
    case 'building':
      return <Building2 className={className} />;
    case 'cog':
      return <Cog className={className} />;
    case 'cpu':
      return <Cpu className={className} />;
    case 'palette':
      return <Palette className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'ruler':
      return <Ruler className={className} />;
    case 'printer':
      return <Printer className={className} />;
    case 'briefcase':
      return <Briefcase className={className} />;
    case 'brain':
      return <Brain className={className} />;
    case 'file-text':
      return <FileText className={className} />;
    case 'pencil-ruler':
      return <PencilRuler className={className} />;
    case 'camera':
      return <Camera className={className} />;
    case 'layout-grid':
      return <LayoutGrid className={className} />;
    case 'folder-shared':
      return <FolderOpen className={className} />;
    case 'file-pdf':
      return <FileText className={className} />;
    case 'folder-zip':
      return <FolderGit2 className={className} />;
    case 'folder-cog':
      return <FolderCog className={className} />;
    case 'file-3d':
      return <FileCode2 className={className} />;
    case 'monitor':
      return <Monitor className={className} />;
    case 'file-list':
      return <FileSpreadsheet className={className} />;
    case 'droplet':
      return <Droplets className={className} />;
    case 'volume':
      return <Volume2 className={className} />;
    case 'cup':
      return <Coffee className={className} />;
    case 'globe':
      return <Globe className={className} />;
    case 'award':
      return <Award className={className} />;
    case 'layers':
      return <Layers className={className} />;
    default:
      return <Settings className={className} />;
  }
};
