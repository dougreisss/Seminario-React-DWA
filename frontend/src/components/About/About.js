import React from 'react';

function About () {
    return (
        <div className="flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full p-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Desenvolvido por</h1>
                <p className="text-lg text-gray-600 text-center leading-relaxed">
                    Alisson Ramos, Benildes Fernandes, Douglas Reis, Érica Barbosa, Ingrid de Albuquerque,
                    Nayara Pereira, Pedro Henrique
                </p>
            </div>
        </div>
    );
}

export default About;
