import React from 'react';
import { FileText, Download, Plus, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: any;
  status: 'verified' | 'pending' | 'missing';
}

interface DocumentVaultProps {
  documents: Document[];
  onUpload?: () => void;
}

export const DocumentVault: React.FC<DocumentVaultProps> = ({ documents, onUpload }) => {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F9FAFB]">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-[#4B5563]" />
          <h3 className="font-bold text-[#111827]">Document Vault</h3>
        </div>
        <button 
          onClick={onUpload}
          className="p-1.5 hover:bg-[#E5E7EB] rounded-lg text-[#059669] transition-colors"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
      <div className="divide-y divide-[#E5E7EB]">
        {documents.length === 0 ? (
          <div className="p-8 text-center text-[#9CA3AF] text-sm italic">
            No documents uploaded for this trade.
          </div>
        ) : (
          documents.map((doc) => (
            <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-[#F9FAFB] transition-colors group">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center",
                  doc.status === 'verified' ? "bg-[#ECFDF5] text-[#059669]" : "bg-[#F3F4F6] text-[#6B7280]"
                )}>
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#111827]">{doc.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-[#9CA3AF] uppercase font-mono">{doc.size}</span>
                    <span className="text-[10px] text-[#9CA3AF]">•</span>
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider",
                      doc.status === 'verified' ? "text-[#059669]" : "text-[#D97706]"
                    )}>
                      {doc.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {doc.status === 'verified' && <ShieldCheck className="h-4 w-4 text-[#059669]" />}
                <button className="p-2 text-[#6B7280] hover:text-[#111827] rounded-md">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
