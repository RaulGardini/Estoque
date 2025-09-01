import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Formulario from './Formulario/Formulario'
import Home from './Home/Home'
import ColantBasicoInfantil from './Home/Estoque/ColantBasicoInfantil'
import ColantBasicoAdulto from './Home/Estoque/ColantBasicoAdulto'
import ColantPreliminarInfantil from './Home/Estoque/ColantPreliminarInfantil'
import ColantPreliminarAdulto from './Home/Estoque/ColantPreliminarAdulto'
import ColantRosa from './Home/Estoque/ColantRosa'
import Redinha from './Home/Estoque/Redinha'
import Adereco from './Home/Estoque/Adereco'
import SapatilhaRosa from './Home/Estoque/SapatilhaRosa'
import MeiaInfantil from './Home/Estoque/MeiaInfantil'
import MeiaAdulto from './Home/Estoque/MeiaAdulto'
import Gerenciamento from './Admin/Gerenciamento'
import GAdereco from './Admin/Estoque/GAdereco'
import GColantBasicoAdulto from './Admin/Estoque/GColantBasicoAdulto'
import GColantBasicoInfantil from './Admin/Estoque/GColantBasicoInfantil'
import GColantPreliminarAdulto from './Admin/Estoque/GColantPreliminarAdulto'
import GColantPreliminarInfantil from './Admin/Estoque/GColantPreliminarInfantil'
import GColantRosa from './Admin/Estoque/GColantRosa'
import GMeiaAdulto from './Admin/Estoque/GMeiaAdulto'
import GRedinha from './Admin/Estoque/GRedinha'
import GMeiaInfantil from './Admin/Estoque/GMeiaInfantil'
import GSapatilhaRosa from './Admin/Estoque/GSapatilhaRosa'
import Movimentacoes from './Admin/Movimentacoes/Movimentacoes'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ColantBasicoInfantil" element={<ColantBasicoInfantil />} />
        <Route path="/ColantBasicoAdulto" element={<ColantBasicoAdulto />} />
        <Route path="/ColantPreliminarInfantil" element={<ColantPreliminarInfantil />} />
        <Route path="/ColantPreliminarAdulto" element={<ColantPreliminarAdulto />} />
        <Route path="/ColantRosa" element={<ColantRosa />} />
        <Route path="/Redinha" element={<Redinha />} />
        <Route path="/Adereco" element={<Adereco />} />
        <Route path="/SapatilhaRosa" element={<SapatilhaRosa />} />
        <Route path="/MeiaInfantil" element={<MeiaInfantil />} />
        <Route path="/MeiaAdulto" element={<MeiaAdulto />} />
        <Route path="/Gerenciamento" element={<Gerenciamento />} />
        <Route path="/GAdereco" element={<GAdereco />} />
        <Route path="/GColantBasicoAdulto" element={<GColantBasicoAdulto />} />
        <Route path="/GColantBasicoInfantil" element={<GColantBasicoInfantil />} />
        <Route path="/GColantPreliminarAdulto" element={<GColantPreliminarAdulto />} />
        <Route path="/GColantPreliminarInfantil" element={<GColantPreliminarInfantil />} />
        <Route path="/GColantRosa" element={<GColantRosa />} />
        <Route path="/GMeiaAdulto" element={<GMeiaAdulto />} />
        <Route path="/GRedinha" element={<GRedinha />} />
        <Route path="/GMeiaInfantil" element={<GMeiaInfantil />} />
        <Route path="/GSapatilhaRosa" element={<GSapatilhaRosa />} />
        <Route path="/Movimentacoes" element={<Movimentacoes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
