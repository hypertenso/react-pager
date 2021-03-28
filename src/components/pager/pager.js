import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "react-feather";

function Pager({ items, page, onChange }) {

    const [current, setCurrent] = useState(1);
    const [pager, setPager] = useState({ 
        page: { total: 1, current: 1, size: 10, limit: 10, start: 1, end: 1 }, 
        pages: [1],
        index: { start: 1, end: 1 }
    });

    useEffect(() => {
        getPager();
    }, [current, items]);

    const getPager = () => {
        
        const pagination = pager;

        if (items === 0 || current < 1 || current > pagination.page.total) {
            return;
        }

        pagination.page.current = current || 1;
        pagination.page.size = page.size || 10;
        pagination.page.limit = page.limit || 10;

        // Calcular o total de páginas
        pagination.page.total = Math.ceil(items / pagination.page.size);

        // Total de páginas menor que o limite, portanto exibir todas as páginas disponíveis
        if (pagination.page.total <= pagination.page.limit) {
            pagination.page.start = 1;
            pagination.page.end = pagination.page.total;
        }

        // Página atual menor que a metade das páginas exibidas, portanto exibir todas as páginas até o limite
        else if (pagination.page.current <= Math.floor((pagination.page.limit / 2) + 1)) {
            pagination.page.start = 1;
            pagination.page.end = pagination.page.limit;
        }

        // Página atual maior mais a metade das páginas exibidas maior que o total de páginas, portanto exibir as últimas páginas
        else if (pagination.page.current + Math.round((pagination.page.limit / 2) - 1) >= pagination.page.total) {
            pagination.page.start = pagination.page.total - (pagination.page.limit - 1);
            pagination.page.end = pagination.page.total;
        }

        // Página atual entre os dois limites de páginas, portanto exibir faixa de páginas
        else {
            pagination.page.start = pagination.page.current - Math.floor(pagination.page.limit / 2);
            pagination.page.end = pagination.page.current + Math.round((pagination.page.limit / 2) - 1);
        }

        // Calcular o index do primeiro e último item exibido
        pagination.index.start = ((pagination.page.current - 1) * pagination.page.size) + 1;
        pagination.index.end = Math.min((pagination.index.start - 1) + pagination.page.size, items);

        // Criar a lista de páginas disponíveis para esta seleção
        pagination.pages = Array.from(Array((pagination.page.end + 1) - pagination.page.start).keys()).map(index => pagination.page.start + index);

        setPager({ ...pagination }, onChange(pager));
    }

    return (
        <div className="px-4 py-3 flex items-center justify-end sm:px-6">
            <div className="sm:hidden">
                <button className="relative inline-flex items-center px-4 py-2 border rounded-md" onClick={() => setCurrent(pager.page.current - 1)} disabled={current === 1}>Anterior</button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 border rounded-md" onClick={() => setCurrent(pager.page.current + 1)} disabled={current === pager.page.total}>Próxima</button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">

                {/* Descrição */}
                <p className="text-sm text-gray-700">Exibindo de <span className="font-medium">{pager.index.start}</span> à <span className="font-medium">{pager.index.end}</span> itens de <span className="font-medium">{items}</span> resultados.</p>

                {/* Paginação */}
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${current === 1 ? 'text-gray-300' : ''}`} onClick={() => setCurrent(1)} disabled={current === 1}>
                        <span className="sr-only">Anterior</span>
                        <ChevronsLeft size={18} />
                    </button>
                    <button className={`relative inline-flex items-center px-2 py-2 border ${current === 1 ? 'text-gray-300' : ''}`} onClick={() => setCurrent(pager.page.current - 1)} disabled={current === 1}>
                        <span className="sr-only">Anterior</span>
                        <ChevronLeft size={18} />
                    </button>
                    {pager.pages.map((page, index) =>
                        <button className={`relative inline-flex items-center px-4 py-2 border ${current === page ? 'bg-indigo-600 bg-blue-500 border-indigo-600 text-white' : ''}`} key={index} onClick={() => setCurrent(page)}>{page}</button>
                    )}
                    <button className={`relative inline-flex items-center px-2 py-2 border ${current === pager.page.total ? 'text-gray-300' : ''}`} onClick={() => setCurrent(pager.page.current + 1)} disabled={current === pager.page.total}>
                        <span className="sr-only">Próxima</span>
                        <ChevronRight size={18} />
                    </button>
                    <button className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${current === pager.page.total ? 'text-gray-300' : ''}`} onClick={() => setCurrent(pager.page.total)} disabled={current === pager.page.total}>
                        <span className="sr-only">Próxima</span>
                        <ChevronsRight size={18} />
                    </button>
                </nav>
            </div>
        </div>
    );
}

export default Pager;
