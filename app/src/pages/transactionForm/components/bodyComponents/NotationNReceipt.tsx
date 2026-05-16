import { Check, Upload, FileText } from 'lucide-react';


interface NotationNReceiptProps {
    notas: string;
    setNotas: (value: string) => void;
    arquivo: File | null;
    setArquivo: (value: File | null) => void;
    isDragging: boolean;
    setIsDragging: (value: boolean) => void;
    fileInputRef: React.RefObject<HTMLInputElement> | React.MutableRefObject<HTMLInputElement | null>;
    handleDrop: (e: React.DragEvent) => void;
    handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const notationNReceipt = ({ notas, setNotas, arquivo, setArquivo, isDragging, setIsDragging, fileInputRef, handleDrop, handleFileInput }: NotationNReceiptProps) => {
    return (
        <section>
            <div className="flex items-center gap-2 mb-3">
                <FileText size={13} className="text-blue-500" strokeWidth={2.5} />
                <span className="text-[10px] font-bold tracking-widest text-blue-500 uppercase">Anotações e Comprovantes</span>
            </div>
            <div className="bg-gray-50/60 rounded-xl border border-gray-100 p-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Notas Internas</label>
                        <textarea
                            value={notas}
                            onChange={e => setNotas(e.target.value)}
                            placeholder="Pagamento referente ao ciclo de processamento..."
                            rows={4}
                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition resize-none"
                        />
                    </div>
                    {/* File upload */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Comprovante (Imagem ou PDF)</label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                            className={`flex-1 flex flex-col items-center justify-center gap-1 border-2 border-dashed rounded-xl cursor-pointer transition min-h-[100px] ${isDragging
                                ? 'border-blue-400 bg-blue-50'
                                : arquivo
                                    ? 'border-emerald-300 bg-emerald-50'
                                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/40'}`}
                        >
                            {arquivo ? (
                                <>
                                    <Check size={20} className="text-emerald-500" />
                                    <span className="text-xs font-semibold text-emerald-600 text-center px-2 truncate max-w-full">{arquivo.name}</span>
                                    <span className="text-[10px] text-gray-400">Clique para substituir</span>
                                </>
                            ) : (
                                <>
                                    <Upload size={20} className="text-gray-400" />
                                    <span className="text-xs text-gray-500">Arraste um arquivo ou <span className="text-blue-600 font-semibold">clique para buscar</span></span>
                                    <span className="text-[10px] text-gray-400">Limite de 10MB • PNG, JPG ou PDF</span>
                                </>
                            )}
                        </div>
                        <input ref={fileInputRef} type="file" accept=".png,.jpg,.jpeg,.pdf" className="hidden" onChange={handleFileInput} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default notationNReceipt;