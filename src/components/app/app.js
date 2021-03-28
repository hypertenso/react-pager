import { useEffect, useState } from "react";

// Components
import Action from "../actions/actions";
import Pager from "../pager/pager";

// Serviços
import * as Pokemon from "../../services/pokemon";

function App() {

    const [limit] = useState(5);
    const [size] = useState(10);
    const [items, setItems] = useState(0);
    const [paged, setPaged] = useState([]);

    useEffect(() => {
        Pokemon
            .fetch(size, 0)
            .then((response) => {
                setItems(response.count);
                setPaged(response.results);
            })

            // TODO: Criar tratamento de erro
            .catch(console.log);
    }, [size, limit]);

    const onChangePage = (pager) => {
        Pokemon
            .fetch(pager.page.size, pager.index.start - 1)
            .then((response) => {
                setItems(response.count);
                setPaged(response.results);
            })

            // TODO: Criar tratamento de erro
            .catch(console.log);
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-wrap content-center">
            <div className="flex-grow">
                <div className="max-w-7xl mx-auto pb-6 sm:pb-12 sm:px-6 lg:px-8">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Itens paginados</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Exemplo de paginação utilizando componentes funcionais.</p>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                {paged.map((item, index) =>
                                    <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${index % 2 ? 'bg-gray-50' : 'bg-white'}`} key={index}>
                                        <dt className="text-sm font-medium text-gray-500">{item.name}</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <span className="mr-2 inline-flex items-center justify-center px-2 py-1 text-xs leading-none text-indigo-100 bg-indigo-600 rounded">{item.url}</span>
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                        <div className="border-t border-gray-200">
                            <Pager
                                items={items}
                                page={{ size, limit }}
                                onChange={(pager) => onChangePage(pager)}
                            />
                        </div>
                    </div>
                </div>
                <Action />
            </div>
        </div>
    );
}

export default App;
