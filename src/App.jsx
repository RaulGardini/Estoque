import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Formulario from './Formulario/Formulario'
import Home from './Home/Home'
import ColantBasicoInfantil from './Home/Estoque/ColantBasicoInfantil'
import ColantBasicoAdulto from './Home/Estoque/ColantBasicoAdulto'
import ColantPreliminarInfantil from './Home/Estoque/ColantPreliminarInfantil'
import ColantPreliminarAdulto from './Home/Estoque/ColantPreliminarAdulto'
import Redinha from './Home/Estoque/Redinha'
import Adereco from './Home/Estoque/Adereco'
import SapatilhaRosa from './Home/Estoque/SapatilhaRosa'
import SapatilhaPreta from './Home/Estoque/SapatilhaPreta'
import MeiaInfantil from './Home/Estoque/MeiaInfantil'
import MeiaAdulto from './Home/Estoque/MeiaAdulto'
import Gerenciamento from './Admin/Gerenciamento'
import GAdereco from './Admin/Estoque/GAdereco'
import GColantBasicoAdulto from './Admin/Estoque/GColantBasicoAdulto'
import GColantBasicoInfantil from './Admin/Estoque/GColantBasicoInfantil'
import GColantPreliminarAdulto from './Admin/Estoque/GColantPreliminarAdulto'
import GColantPreliminarInfantil from './Admin/Estoque/GColantPreliminarInfantil'
import GMeiaAdulto from './Admin/Estoque/GMeiaAdulto'
import GRedinha from './Admin/Estoque/GRedinha'
import GMeiaInfantil from './Admin/Estoque/GMeiaInfantil'
import GSapatilhaPreta from './Admin/Estoque/GSapatilhaPreta'
import GSapatilhaRosa from './Admin/Estoque/GSapatilhaRosa'

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
        <Route path="/Redinha" element={<Redinha />} />
        <Route path="/Adereco" element={<Adereco />} />
        <Route path="/SapatilhaRosa" element={<SapatilhaRosa />} />
        <Route path="/SapatilhaPreta" element={<SapatilhaPreta />} />
        <Route path="/MeiaInfantil" element={<MeiaInfantil />} />
        <Route path="/MeiaAdulto" element={<MeiaAdulto />} />
        <Route path="/Gerenciamento" element={<Gerenciamento />} />
        <Route path="/GAdereco" element={<GAdereco />} />
        <Route path="/GColantBasicoAdulto" element={<GColantBasicoAdulto />} />
        <Route path="/GColantBasicoInfantil" element={<GColantBasicoInfantil />} />
        <Route path="/GColantPreliminarAdulto" element={<GColantPreliminarAdulto />} />
        <Route path="/GColantPreliminarInfantil" element={<GColantPreliminarInfantil />} />
        <Route path="/GMeiaAdulto" element={<GMeiaAdulto />} />
        <Route path="/GRedinha" element={<GRedinha />} />
        <Route path="/GMeiaInfantil" element={<GMeiaInfantil />} />
        <Route path="/GSapatilhaPreta" element={<GSapatilhaPreta />} />
        <Route path="/GSapatilhaRosa" element={<GSapatilhaRosa />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
