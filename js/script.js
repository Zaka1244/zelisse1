const productCountInput = document.getElementById('productCount');
const deliverySelect = document.getElementById('deliveryOption');
const totalDisplay = document.getElementById('totalDisplay');
const form = document.getElementById('checkoutForm');
const productLabel = document.getElementById('selectedProduct');
const priceLabel = document.getElementById('price');
const scriptURL = 'https://script.google.com/macros/s/AKfycbxf9QVF45yiZ-5RvGKOxZZnEu-xsRn4HrUzgmYAI2U0obVxJFw9_FKYafJs_ed66F6WYA/exec';

function selectProduct(element, name, price) {
  document.querySelectorAll('.product-item').forEach(item => item.classList.remove('selected'));
  element.classList.add('selected');

  productLabel.textContent = name;
  priceLabel.textContent = `${price} DA`;
  document.getElementById('basePrice').value = price;

  localStorage.setItem('zelisse_product_name', name);
  localStorage.setItem('zelisse_product_price', price);

  calculateTotal();
}

function calculateTotal() {
  const count = parseInt(productCountInput.value) || 1;
  const delivery = deliverySelect.value;
  let deliveryCost = delivery === 'home' ? 600 : delivery === 'stopdesk' ? 200 : 0;
  const base = parseInt(document.getElementById('basePrice').value) || 0;
  const total = base * count + deliveryCost;
  totalDisplay.textContent = `Total: ${total} DA`;
  return total;
}

productCountInput.addEventListener('input', calculateTotal);
deliverySelect.addEventListener('change', calculateTotal);

function populateCommunes() {
  const communeSelect = document.getElementById('commune');
  const wilaya = document.getElementById('wilaya').value;
  communeSelect.innerHTML = '<option value="">-- اختر البلدية / Sélectionnez une commune --</option>';

  const communesByWilaya = {
    // Add your actual Wilaya: [communes[]] mapping here
    "01": ['Adrar', 'Tamest', 'Charouine', 'Reggane', 'Inozghmir', 'Tit', 'Ksar Kaddour', 'Tsabit', 'Timimoun', 'Ouled Said', 'Zaouiet Kounta', 'Aoulef', 'Timokten', 'Tamentit', 'Fenoughil', 'Tinerkouk', 'Deldoul', 'Sali', 'Akabli', 'Metarfa', 'O Ahmed Timmi', 'Bouda', 'Aougrout', 'Talmine', 'B Badji Mokhtar', 'Sbaa', 'Ouled Aissa', 'Timiaouine', 'ouled ahmed tami', 'sebaa', 'tamekten'],
  "02": ['Chlef', 'Tenes', 'Benairia', 'El Karimia', 'Tadjena', 'Taougrite', 'Beni Haoua', 'Sobha', 'Harchoun', 'Ouled Fares', 'Sidi Akacha', 'Boukadir', 'Beni Rached', 'Talassa', 'Harenfa', 'Oued Goussine', 'Dahra', 'Ouled Abbes', 'Sendjas', 'Zeboudja', 'Oued Sly', 'Abou El Hassen', 'El Marsa', 'Chettia', 'Sidi Abderrahmane', 'Moussadek', 'El Hadjadj', 'Labiod Medjadja', 'Oued Fodda', 'Ouled Ben Abdelkader', 'Bouzeghaia', 'Ain Merane', 'Oum Drou', 'Breira', 'Ben Boutaleb', 'Beni Bouateb'],
  "03": ['Laghouat', 'Ksar El Hirane', 'Benacer Ben Chohra', 'Sidi Makhlouf', 'Hassi Delaa', 'Hassi R Mel', 'Ain Mahdi', 'Tadjmout', 'Kheneg', 'Gueltat Sidi Saad', 'Ain Sidi Ali', 'Beidha', 'Brida', 'El Ghicha', 'Hadj Mechri', 'Sebgag', 'Taouiala', 'Tadjrouna', 'Aflou', 'El Assafia', 'Oued Morra', 'Oued M Zi', 'El Houaita', 'Sidi Bouzid'],
  "04": ['Oum El Bouaghi', 'Ain Beida', 'Ainmlila', 'Behir Chergui', 'El Amiria', 'Sigus', 'El Belala', 'Ain Babouche', 'Berriche', 'Ouled Hamla', 'Dhala', 'Ain Kercha', 'Hanchir Toumghani', 'El Djazia', 'Ain Diss', 'Fkirina', 'Souk Naamane', 'Zorg', 'El Fedjoudj Boughrar', 'Ouled Zouai', 'Bir Chouhada', 'Ksar Sbahi', 'Oued Nini', 'Meskiana', 'Ain Fekroune', 'Rahia', 'Ain Zitoun', 'Ouled Gacem', 'El Harmilia'],
  "05": ['Batna', 'Ghassira', 'Maafa', 'Merouana', 'Seriana', 'Menaa', 'El Madher', 'Tazoult', 'Ngaous', 'Guigba', 'Inoughissen', 'Ouyoun El Assafir', 'Djerma', 'Bitam', 'Metkaouak', 'Arris', 'Kimmel', 'Tilatou', 'Ain Djasser', 'Ouled Selam', 'Tigherghar', 'Ain Yagout', 'Fesdis', 'Sefiane', 'Rahbat', 'Tighanimine', 'Lemsane', 'Ksar Belezma', 'Seggana', 'Ichmoul', 'Foum Toub', 'Beni Foudhala El Hakania', 'Oued El Ma', 'Talkhamt', 'Bouzina', 'Chemora', 'Oued Chaaba', 'Taxlent', 'Gosbat', 'Ouled Aouf', 'Boumagueur', 'Barika', 'Djezzar', 'Tkout', 'Ain Touta', 'Hidoussa', 'Teniet El Abed', 'Oued Taga', 'Ouled Fadel', 'Timgad', 'Ras El Aioun', 'Chir', 'Ouled Si Slimane', 'Zanat El Beida', 'Amdoukal', 'Ouled Ammar', 'El Hassi', 'Lazrou', 'Boumia', 'Boulhilat', 'Larbaa'],
  "06": ['Bejaia', 'Amizour', 'Ferraoun', 'Taourirt Ighil', 'Chelata', 'Tamokra', 'Timzrit', 'Souk El Thenine', 'Mcisna', 'Thinabdher', 'Tichi', 'Semaoun', 'Kendira', 'Tifra', 'Ighram', 'Amalou', 'Ighil Ali', 'Ifelain Ilmathen', 'Toudja', 'Darguina', 'Sidi Ayad', 'Aokas', 'Beni Djellil', 'Adekar', 'Akbou', 'Seddouk', 'Tazmalt', 'Ait Rizine', 'Chemini', 'Souk Oufella', 'Taskriout', 'Tibane', 'Tala Hamza', 'Barbacha', 'Beni Ksila', 'Ouzallaguen', 'Bouhamza', 'Beni Melikeche', 'Sidi Aich', 'El Kseur', 'Melbou', 'Akfadou', 'Leflaye', 'Kherrata', 'Draa Kaid', 'Tamridjet', 'Ait Smail', 'Boukhelifa', 'Tizi Nberber', 'Beni Maouch', 'Oued Ghir', 'Boudjellil'],
  "07": ['Biskra', 'Oumache', 'Branis', 'Chetma', 'Ouled Djellal', 'Ras El Miaad', 'Besbes', 'Sidi Khaled', 'Doucen', 'Ech Chaiba', 'Sidi Okba', 'Mchouneche', 'El Haouch', 'Ain Naga', 'Zeribet El Oued', 'El Feidh', 'El Kantara', 'Ain Zaatout', 'El Outaya', 'Djemorah', 'Tolga', 'Lioua', 'Lichana', 'Ourlal', 'Mlili', 'Foughala', 'Bordj Ben Azzouz', 'Meziraa', 'Bouchagroun', 'Mekhadma', 'El Ghrous', 'El Hadjab', 'Khanguet Sidinadji'],
  "08": ['Bechar', 'Erg Ferradj', 'Ouled Khoudir', 'Meridja', 'Timoudi', 'Lahmar', 'Beni Abbes', 'Beni Ikhlef', 'Mechraa Houari B', 'Kenedsa', 'Igli', 'Tabalbala', 'Taghit', 'El Ouata', 'Boukais', 'Mogheul', 'Abadla', 'Kerzaz', 'Ksabi', 'Tamtert', 'Beni Ounif'],
  "09": ['Blida', 'Chebli', 'Bouinan', 'Oued El Alleug', 'Ouled Yaich', 'Chrea', 'El Affroun', 'Chiffa', 'Hammam Melouane', 'Ben Khlil', 'Soumaa', 'Mouzaia', 'Souhane', 'Meftah', 'Ouled Selama', 'Boufarik', 'Larbaa', 'Oued Djer', 'Beni Tamou', 'Bouarfa', 'Beni Mered', 'Bougara', 'Guerrouaou', 'Ain Romana', 'Djebabra'],
  "10": ['Bouira', 'El Asnam', 'Guerrouma', 'Souk El Khemis', 'Kadiria', 'Hanif', 'Dirah', 'Ait Laaziz', 'Taghzout', 'Raouraoua', 'Mezdour', 'Haizer', 'Lakhdaria', 'Maala', 'El Hachimia', 'Aomar', 'Chorfa', 'Bordj Oukhriss', 'El Adjiba', 'El Hakimia', 'El Khebouzia', 'Ahl El Ksar', 'Bouderbala', 'Zbarbar', 'Ain El Hadjar', 'Djebahia', 'Aghbalou', 'Taguedit', 'Ain Turk', 'Saharidj', 'Dechmia', 'Ridane', 'Bechloul', 'Boukram', 'Ain Bessam', 'Bir Ghbalou', 'Mchedallah', 'Sour El Ghozlane', 'Maamora', 'Ouled Rached', 'Ain Laloui', 'Hadjera Zerga', 'Ath Mansour', 'El Mokrani', 'Oued El Berdi'],
  "11": ['Tamanghasset', 'Abalessa', 'In Ghar', 'In Guezzam', 'Idles', 'Tazouk', 'Tinzaouatine', 'In Salah', 'In Amguel', 'Foggaret Ezzaouia'],
  "12": ['Tebessa', 'Bir El Ater', 'Cheria', 'Stah Guentis', 'El Aouinet', 'Lahouidjbet', 'Safsaf El Ouesra', 'Hammamet', 'Negrine', 'Bir El Mokadem', 'El Kouif', 'Morsott', 'El Ogla', 'Bir Dheheb', 'El Ogla El Malha', 'Gorriguer', 'Bekkaria', 'Boukhadra', 'Ouenza', 'El Ma El Biodh', 'Oum Ali', 'Thlidjene', 'Ain Zerga', 'El Meridj', 'Boulhaf Dyr', 'Bedjene', 'El Mazeraa', 'Ferkane'],
  "13": ['Tlemcen', 'Beni Mester', 'Ain Tallout', 'Remchi', 'El Fehoul', 'Sabra', 'Ghazaouet', 'Souani', 'Djebala', 'El Gor', 'Oued Chouly', 'Ain Fezza', 'Ouled Mimoun', 'Amieur', 'Ain Youcef', 'Zenata', 'Beni Snous', 'Bab El Assa', 'Dar Yaghmouracene', 'Fellaoucene', 'Azails', 'Sebbaa Chioukh', 'Terni Beni Hediel', 'Bensekrane', 'Ain Nehala', 'Hennaya', 'Maghnia', 'Hammam Boughrara', 'Souahlia', 'Msirda Fouaga', 'Ain Fetah', 'El Aricha', 'Souk Thlata', 'Sidi Abdelli', 'Sebdou', 'Beni Ouarsous', 'Sidi Medjahed', 'Beni Boussaid', 'Marsa Ben Mhidi', 'Nedroma', 'Sidi Djillali', 'Beni Bahdel', 'El Bouihi', 'Honaine', 'Tianet', 'Ouled Riyah', 'Bouhlou', 'Souk El Khemis', 'Ain Ghoraba', 'Chetouane', 'Mansourah', 'Beni Semiel', 'Ain Kebira'],
  "14": ['Tiaret', 'Medroussa', 'Ain Bouchekif', 'Sidi Ali Mellal', 'Ain Zarit', 'Ain Deheb', 'Sidi Bakhti', 'Medrissa', 'Zmalet El Emir Aek', 'Madna', 'Sebt', 'Mellakou', 'Dahmouni', 'Rahouia', 'Mahdia', 'Sougueur', 'Sidi Abdelghani', 'Ain El Hadid', 'Ouled Djerad', 'Naima', 'Meghila', 'Guertoufa', 'Sidi Hosni', 'Djillali Ben Amar', 'Sebaine', 'Tousnina', 'Frenda', 'Ain Kermes', 'Ksar Chellala', 'Rechaiga', 'Nadorah', 'Tagdemt', 'Oued Lilli', 'Mechraa Safa', 'Hamadia', 'Chehaima', 'Takhemaret', 'Sidi Abderrahmane', 'Serghine', 'Bougara', 'Faidja', 'Tidda'],
  "15": ['Tizi Ouzou', 'Ain El Hammam', 'Akbil', 'Freha', 'Souamaa', 'Mechtrass', 'Irdjen', 'Timizart', 'Makouda', 'Draa El Mizan', 'Tizi Ghenif', 'Bounouh', 'Ait Chaffaa', 'Frikat', 'Beni Aissi', 'Beni Zmenzer', 'Iferhounene', 'Azazga', 'Iloula Oumalou', 'Yakouren', 'Larba Nait Irathen', 'Tizi Rached', 'Zekri', 'Ouaguenoun', 'Ain Zaouia', 'Mkira', 'Ait Yahia', 'Ait Mahmoud', 'Maatka', 'Ait Boumehdi', 'Abi Youcef', 'Beni Douala', 'Illilten', 'Bouzguen', 'Ait Aggouacha', 'Ouadhia', 'Azzefoun', 'Tigzirt', 'Ait Aissa Mimoun', 'Boghni', 'Ifigha', 'Ait Oumalou', 'Tirmitine', 'Akerrou', 'Yatafen', 'Beni Ziki', 'Draa Ben Khedda', 'Ouacif', 'Idjeur', 'Mekla', 'Tizi Nthlata', 'Beni Yenni', 'Aghrib', 'Iflissen', 'Boudjima', 'Ait Yahia Moussa', 'Souk El Thenine', 'Ait Khelil', 'Sidi Naamane', 'Iboudraren', 'Aghni Goughran', 'Mizrana', 'Imsouhal', 'Tadmait', 'Ait Bouadou', 'Assi Youcef', 'Ait Toudert'],
  "16": ['Alger Centre', 'Sidi Mhamed', 'El Madania', 'Hamma Anassers', 'Bab El Oued', 'Bologhine Ibn Ziri', 'Casbah', 'Oued Koriche', 'Bir Mourad Rais', 'El Biar', 'Bouzareah', 'Birkhadem', 'El Harrach', 'Baraki', 'Oued Smar', 'Bourouba', 'Hussein Dey', 'Kouba', 'Bachedjerah', 'Dar El Beida', 'Bab Azzouar', 'Ben Aknoun', 'Dely Ibrahim', 'Bains Romains', 'Rais Hamidou', 'Djasr Kasentina', 'El Mouradia', 'Hydra', 'Mohammadia', 'Bordj El Kiffan', 'El Magharia', 'Beni Messous', 'Les Eucalyptus', 'Birtouta', 'Tassala El Merdja', 'Ouled Chebel', 'Sidi Moussa', 'Ain Taya', 'Bordj El Bahri', 'Marsa', 'Haraoua', 'Rouiba', 'Reghaia', 'Ain Benian', 'Staoueli', 'Zeralda', 'Mahelma', 'Rahmania', 'Souidania', 'Cheraga', 'Ouled Fayet', 'El Achour', 'Draria', 'Douera', 'Baba Hassen', 'Khracia', 'Saoula'],
  "17": ['Djelfa', 'Moudjebara', 'El Guedid', 'Hassi Bahbah', 'Ain Maabed', 'Sed Rahal', 'Feidh El Botma', 'Birine', 'Bouira Lahdeb', 'Zaccar', 'El Khemis', 'Sidi Baizid', 'Mliliha', 'El Idrissia', 'Douis', 'Hassi El Euch', 'Messaad', 'Guettara', 'Sidi Ladjel', 'Had Sahary', 'Guernini', 'Selmana', 'Ain Chouhada', 'Oum Laadham', 'Dar Chouikh', 'Charef', 'Beni Yacoub', 'Zaafrane', 'Deldoul', 'Ain El Ibel', 'Ain Oussera', 'Benhar', 'Hassi Fedoul', 'Amourah', 'Ain Fekka', 'Tadmit'],
  "18": ['Jijel', 'Erraguene', 'El Aouana', 'Ziamma Mansouriah', 'Taher', 'Emir Abdelkader', 'Chekfa', 'Chahna', 'El Milia', 'Sidi Maarouf', 'Settara', 'El Ancer', 'Sidi Abdelaziz', 'Kaous', 'Ghebala', 'Bouraoui Belhadef', 'Djmila', 'Selma Benziada', 'Boussif Ouled Askeur', 'El Kennar Nouchfi', 'Ouled Yahia Khadrouch', 'Boudria Beni Yadjis', 'Kemir Oued Adjoul', 'Texena', 'Djemaa Beni Habibi', 'Bordj Taher', 'Ouled Rabah', 'Ouadjana'],
  "19": ['Setif', 'Ain El Kebira', 'Beni Aziz', 'Ouled Sidi Ahmed', 'Boutaleb', 'Ain Roua', 'Draa Kebila', 'Bir El Arch', 'Beni Chebana', 'Ouled Tebben', 'Hamma', 'Maaouia', 'Ain Legraj', 'Ain Abessa', 'Dehamcha', 'Babor', 'Guidjel', 'Ain Lahdjar', 'Bousselam', 'El Eulma', 'Djemila', 'Beni Ouartilane', 'Rosfa', 'Ouled Addouane', 'Belaa', 'Ain Arnat', 'Amoucha', 'Ain Oulmane', 'Beidha Bordj', 'Bouandas', 'Bazer Sakhra', 'Hammam Essokhna', 'Mezloug', 'Bir Haddada', 'Serdj El Ghoul', 'Harbil', 'El Ouricia', 'Tizi Nbechar', 'Salah Bey', 'Ain Azal', 'Guenzet', 'Talaifacene', 'Bougaa', 'Beni Fouda', 'Tachouda', 'Beni Mouhli', 'Ouled Sabor', 'Guellal', 'Ain Sebt', 'Hammam Guergour', 'Ait Naoual Mezada', 'Ksar El Abtal', 'Beni Hocine', 'Ait Tizi', 'Maouklane', 'Guelta Zerka', 'Oued El Barad', 'Taya', 'El Ouldja', 'Tella'],
  "20": ['Saida', 'Doui Thabet', 'Ain El Hadjar', 'Ouled Khaled', 'Moulay Larbi', 'Youb', 'Hounet', 'Sidi Amar', 'Sidi Boubekeur', 'El Hassasna', 'Maamora', 'Sidi Ahmed', 'Ain Sekhouna', 'Ouled Brahim', 'Tircine', 'Ain Soltane'],
  "21": ['Skikda', 'Ain Zouit', 'El Hadaik', 'Azzaba', 'Djendel Saadi Mohamed', 'Ain Cherchar', 'Bekkouche Lakhdar', 'Benazouz', 'Es Sebt', 'Collo', 'Beni Zid', 'Kerkera', 'Ouled Attia', 'Oued Zehour', 'Zitouna', 'El Harrouch', 'Zerdazas', 'Ouled Hebaba', 'Sidi Mezghiche', 'Emdjez Edchich', 'Beni Oulbane', 'Ain Bouziane', 'Ramdane Djamel', 'Beni Bachir', 'Salah Bouchaour', 'Tamalous', 'Ain Kechra', 'Oum Toub', 'Bein El Ouiden', 'Fil Fila', 'Cheraia', 'Kanoua', 'El Ghedir', 'Bouchtata', 'Ouldja Boulbalout', 'Kheneg Mayoum', 'Hamadi Krouma', 'El Marsa'],
  "22": ['Sidi Bel Abbes', 'Tessala', 'Sidi Brahim', 'Mostefa Ben Brahim', 'Telagh', 'Mezaourou', 'Boukhanafis', 'Sidi Ali Boussidi', 'Badredine El Mokrani', 'Marhoum', 'Tafissour', 'Amarnas', 'Tilmouni', 'Sidi Lahcene', 'Ain Thrid', 'Makedra', 'Tenira', 'Moulay Slissen', 'El Hacaiba', 'Hassi Zehana', 'Tabia', 'Merine', 'Ras El Ma', 'Ain Tindamine', 'Ain Kada', 'Mcid', 'Sidi Khaled', 'Ain El Berd', 'Sfissef', 'Ain Adden', 'Oued Taourira', 'Dhaya', 'Zerouala', 'Lamtar', 'Sidi Chaib', 'Sidi Dahou Dezairs', 'Oued Sbaa', 'Boudjebaa El Bordj', 'Sehala Thaoura', 'Sidi Yacoub', 'Sidi Hamadouche', 'Belarbi', 'Oued Sefioun', 'Teghalimet', 'Ben Badis', 'Sidi Ali Benyoub', 'Chetouane Belaila', 'Bir El Hammam', 'Taoudmout', 'Redjem Demouche', 'Benachiba Chelia', 'Hassi Dahou'],
  "23": ['Annaba', 'Berrahel', 'El Hadjar', 'Eulma', 'El Bouni', 'Oued El Aneb', 'Cheurfa', 'Seraidi', 'Ain Berda', 'Chetaibi', 'Sidi Amer', 'Treat'],
  "24": ['Guelma', 'Nechmaya', 'Bouati Mahmoud', 'Oued Zenati', 'Tamlouka', 'Oued Fragha', 'Ain Sandel', 'Ras El Agba', 'Dahouara', 'Belkhir', 'Ben Djarah', 'Bou Hamdane', 'Ain Makhlouf', 'Ain Ben Beida', 'Khezara', 'Beni Mezline', 'Bou Hachana', 'Guelaat Bou Sbaa', 'Hammam Maskhoutine', 'El Fedjoudj', 'Bordj Sabat', 'Hamman Nbail', 'Ain Larbi', 'Medjez Amar', 'Bouchegouf', 'Heliopolis', 'Ain Hessania', 'Roknia', 'Salaoua Announa', 'Medjez Sfa', 'Boumahra Ahmed', 'Ain Reggada', 'Oued Cheham', 'Djeballah Khemissi'],
  "25": ['Constantine', 'Hamma Bouziane', 'El Haria', 'Zighoud Youcef', 'Didouche Mourad', 'El Khroub', 'Ain Abid', 'Beni Hamiden', 'Ouled Rahmoune', 'Ain Smara', 'Mesaoud Boudjeriou', 'Ibn Ziad'],
  "26": ['Medea', 'Ouzera', 'Ouled Maaref', 'Ain Boucif', 'Aissaouia', 'Ouled Deide', 'El Omaria', 'Derrag', 'El Guelbelkebir', 'Bouaiche', 'Mezerena', 'Ouled Brahim', 'Damiat', 'Sidi Ziane', 'Tamesguida', 'El Hamdania', 'Kef Lakhdar', 'Chelalet El Adhaoura', 'Bouskene', 'Rebaia', 'Bouchrahil', 'Ouled Hellal', 'Tafraout', 'Baata', 'Boghar', 'Sidi Naamane', 'Ouled Bouachra', 'Sidi Zahar', 'Oued Harbil', 'Benchicao', 'Sidi Damed', 'Aziz', 'Souagui', 'Zoubiria', 'Ksar El Boukhari', 'El Azizia', 'Djouab', 'Chahbounia', 'Meghraoua', 'Cheniguel', 'Ain Ouksir', 'Oum El Djalil', 'Ouamri', 'Si Mahdjoub', 'Tlatet Eddoair', 'Beni Slimane', 'Berrouaghia', 'Seghouane', 'Meftaha', 'Mihoub', 'Boughezoul', 'Tablat', 'Deux Bassins', 'Draa Essamar', 'Sidi Errabia', 'Bir Ben Laabed', 'El Ouinet', 'Ouled Antar', 'Bouaichoune', 'Hannacha', 'Sedraia', 'Medjebar', 'Khams Djouamaa', 'Saneg'],
  "27": ['Mostaganem', 'Sayada', 'Fornaka', 'Stidia', 'Ain Nouissy', 'Hassi Maameche', 'Ain Tadles', 'Sour', 'Oued El Kheir', 'Sidi Bellater', 'Kheiredine', 'Sidi Ali', 'Abdelmalek Ramdane', 'Hadjadj', 'Nekmaria', 'Sidi Lakhdar', 'Achaacha', 'Khadra', 'Bouguirat', 'Sirat', 'Ain Sidi Cherif', 'Mesra', 'Mansourah', 'Souaflia', 'Ouled Boughalem', 'Ouled Maallah', 'Mezghrane', 'Ain Boudinar', 'Tazgait', 'Safsaf', 'Touahria', 'El Hassiane'],
  "28": ['Msila', 'Maadid', 'Hammam Dhalaa', 'Ouled Derradj', 'Tarmount', 'Mtarfa', 'Khoubana', 'Mcif', 'Chellal', 'Ouled Madhi', 'Magra', 'Berhoum', 'Ain Khadra', 'Ouled Addi Guebala', 'Belaiba', 'Sidi Aissa', 'Ain El Hadjel', 'Sidi Hadjeres', 'Ouanougha', 'Bou Saada', 'Ouled Sidi Brahim', 'Sidi Ameur', 'Tamsa', 'Ben Srour', 'Ouled Slimane', 'El Houamed', 'El Hamel', 'Ouled Mansour', 'Maarif', 'Dehahna', 'Bouti Sayah', 'Khettouti Sed Djir', 'Zarzour', 'Oued Chair', 'Benzouh', 'Bir Foda', 'Ain Fares', 'Sidi Mhamed', 'Ouled Atia', 'Souamaa', 'Ain El Melh', 'Medjedel', 'Slim', 'Ain Errich', 'Beni Ilmane', 'Oultene', 'Djebel Messaad'],
  "29": ['Mascara', 'Bou Hanifia', 'Tizi', 'Hacine', 'Maoussa', 'Teghennif', 'El Hachem', 'Sidi Kada', 'Zelmata', 'Oued El Abtal', 'Ain Ferah', 'Ghriss', 'Froha', 'Matemore', 'Makdha', 'Sidi Boussaid', 'El Bordj', 'Ain Fekan', 'Benian', 'Khalouia', 'El Menaouer', 'Oued Taria', 'Aouf', 'Ain Fares', 'Ain Frass', 'Sig', 'Oggaz', 'Alaimia', 'El Gaada', 'Zahana', 'Mohammadia', 'Sidi Abdelmoumene', 'Ferraguig', 'El Ghomri', 'Sedjerara', 'Moctadouz', 'Bou Henni', 'Guettena', 'El Mamounia', 'El Keurt', 'Gharrous', 'Gherdjoum', 'Chorfa', 'Ras Ain Amirouche', 'Nesmot', 'Sidi Abdeldjebar', 'Sehailia'],
  "30": ['Ouargla', 'Ain Beida', 'Ngoussa', 'Hassi Messaoud', 'Rouissat', 'Balidat Ameur', 'Tebesbest', 'Nezla', 'Zaouia El Abidia', 'Sidi Slimane', 'Sidi Khouiled', 'Hassi Ben Abdellah', 'Touggourt', 'El Hadjira', 'Taibet', 'Tamacine', 'Benaceur', 'Mnaguer', 'Megarine', 'El Allia', 'El Borma'],
  "31": ['Oran', 'Gdyel', 'Bir El Djir', 'Hassi Bounif', 'Es Senia', 'Arzew', 'Bethioua', 'Marsat El Hadjadj', 'Ain Turk', 'El Ancar', 'Oued Tlelat', 'Tafraoui', 'Sidi Chami', 'Boufatis', 'Mers El Kebir', 'Bousfer', 'El Karma', 'El Braya', 'Hassi Ben Okba', 'Ben Freha', 'Hassi Mefsoukh', 'Sidi Ben Yabka', 'Messerghin', 'Boutlelis', 'Ain Kerma', 'Ain Biya'],
  "32": ['El Bayadh', 'Rogassa', 'Stitten', 'Brezina', 'Ghassoul', 'Boualem', 'El Abiodh Sidi Cheikh', 'Ain El Orak', 'Arbaouat', 'Bougtoub', 'El Kheither', 'Kef El Ahmar', 'Boussemghoun', 'Chellala', 'Krakda', 'El Bnoud', 'Cheguig', 'Sidi Ameur', 'El Mehara', 'Tousmouline', 'Sidi Slimane', 'Sidi Tifour'],
  "33": ['Illizi', 'Djanet', 'Debdeb', 'Bordj Omar Driss', 'Bordj El Haouasse', 'In Amenas'],
  "34": ['Bordj Bou Arreridj', 'Ras El Oued', 'Bordj Zemoura', 'Mansoura', 'El Mhir', 'Ben Daoud', 'El Achir', 'Ain Taghrout', 'Bordj Ghdir', 'Sidi Embarek', 'El Hamadia', 'Belimour', 'Medjana', 'Teniet En Nasr', 'Djaafra', 'El Main', 'Ouled Brahem', 'Ouled Dahmane', 'Hasnaoua', 'Khelil', 'Taglait', 'Ksour', 'Ouled Sidi Brahim', 'Tafreg', 'Colla', 'Tixter', 'El Ach', 'El Anseur', 'Tesmart', 'Ain Tesra', 'Bir Kasdali', 'Ghilassa', 'Rabta', 'Haraza'],
  "35": ['Boumerdes', 'Boudouaou', 'Afir', 'Bordj Menaiel', 'Baghlia', 'Sidi Daoud', 'Naciria', 'Djinet', 'Isser', 'Zemmouri', 'Si Mustapha', 'Tidjelabine', 'Chabet El Ameur', 'Thenia', 'Timezrit', 'Corso', 'Ouled Moussa', 'Larbatache', 'Bouzegza Keddara', 'Taourga', 'Ouled Aissa', 'Ben Choud', 'Dellys', 'Ammal', 'Beni Amrane', 'Souk El Had', 'Boudouaou El Bahri', 'Ouled Hedadj', 'Laghata', 'Hammedi', 'Khemis El Khechna', 'El Kharrouba'],
  "36": ['El Tarf', 'Bouhadjar', 'Ben Mhidi', 'Bougous', 'El Kala', 'Ain El Assel', 'El Aioun', 'Bouteldja', 'Souarekh', 'Berrihane', 'Lac Des Oiseaux', 'Chefia', 'Drean', 'Chihani', 'Chebaita Mokhtar', 'Besbes', 'Asfour', 'Echatt', 'Zerizer', 'Zitouna', 'Ain Kerma', 'Oued Zitoun', 'Hammam Beni Salah', 'Raml Souk'],
  "37": ['Tindouf', 'Oum El Assel'],
  "38": ['Tissemsilt', 'Bordj Bou Naama', 'Theniet El Had', 'Lazharia', 'Beni Chaib', 'Lardjem', 'Melaab', 'Sidi Lantri', 'Bordj El Emir Abdelkader', 'Layoune', 'Khemisti', 'Ouled Bessem', 'Ammari', 'Youssoufia', 'Sidi Boutouchent', 'Larbaa', 'Maasem', 'Sidi Abed', 'Tamalaht', 'Sidi Slimane', 'Boucaid', 'Beni Lahcene'],
  "39": ['El Oued', 'Robbah', 'Oued El Alenda', 'Bayadha', 'Nakhla', 'Guemar', 'Kouinine', 'Reguiba', 'Hamraia', 'Taghzout', 'Debila', 'Hassani Abdelkrim', 'Hassi Khelifa', 'Taleb Larbi', 'Douar El Ma', 'Sidi Aoun', 'Trifaoui', 'Magrane', 'Beni Guecha', 'Ourmas', 'Still', 'Mrara', 'Sidi Khellil', 'Tendla', 'El Ogla', 'Mih Ouansa', 'El Mghair', 'Djamaa', 'Oum Touyour', 'Sidi Amrane'],
  "40": ['Khenchela', 'Mtoussa', 'Kais', 'Baghai', 'El Hamma', 'Ain Touila', 'Taouzianat', 'Bouhmama', 'El Oueldja', 'Remila', 'Cherchar', 'Djellal', 'Babar', 'Tamza', 'Ensigha', 'Ouled Rechache', 'El Mahmal', 'Msara', 'Yabous', 'Khirane', 'Chelia'],
  "41": ['Souk Ahras', 'Sedrata', 'Hanancha', 'Mechroha', 'Ouled Driss', 'Tiffech', 'Zaarouria', 'Taoura', 'Drea', 'Haddada', 'Khedara', 'Merahna', 'Ouled Moumen', 'Bir Bouhouche', 'Mdaourouche', 'Oum El Adhaim', 'Ain Zana', 'Ain Soltane', 'Quillen', 'Sidi Fredj', 'Safel El Ouiden', 'Ragouba', 'Khemissa', 'Oued Keberit', 'Terraguelt', 'Zouabi'],
  "42": ['Tipaza', 'Menaceur', 'Larhat', 'Douaouda', 'Bourkika', 'Khemisti', 'Aghabal', 'Hadjout', 'Sidi Amar', 'Gouraya', 'Nodor', 'Chaiba', 'Ain Tagourait', 'Cherchel', 'Damous', 'Meurad', 'Fouka', 'Bou Ismail', 'Ahmer El Ain', 'Bou Haroun', 'Sidi Ghiles', 'Messelmoun', 'Sidi Rached', 'Kolea', 'Attatba', 'Sidi Semiane', 'Beni Milleuk', 'Hadjerat Ennous'],
  "43": ['Mila', 'Ferdjioua', 'Chelghoum Laid', 'Oued Athmenia', 'Ain Mellouk', 'Telerghma', 'Oued Seguen', 'Tadjenanet', 'Benyahia Abderrahmane', 'Oued Endja', 'Ahmed Rachedi', 'Ouled Khalouf', 'Tiberguent', 'Bouhatem', 'Rouached', 'Tessala Lamatai', 'Grarem Gouga', 'Sidi Merouane', 'Tassadane Haddada', 'Derradji Bousselah', 'Minar Zarza', 'Amira Arras', 'Terrai Bainen', 'Hamala', 'Ain Tine', 'El Mechira', 'Sidi Khelifa', 'Zeghaia', 'Elayadi Barbes', 'Ain Beida Harriche', 'Yahia Beniguecha', 'Chigara'],
  "44": ['Ain Defla', 'Miliana', 'Boumedfaa', 'Khemis Miliana', 'Hammam Righa', 'Arib', 'Djelida', 'El Amra', 'Bourached', 'El Attaf', 'El Abadia', 'Djendel', 'Oued Chorfa', 'Ain Lechiakh', 'Oued Djemaa', 'Rouina', 'Zeddine', 'El Hassania', 'Bir Ouled Khelifa', 'Ain Soltane', 'Tarik Ibn Ziad', 'Bordj Emir Khaled', 'Ain Torki', 'Sidi Lakhdar', 'Ben Allal', 'Ain Benian', 'Hoceinia', 'Barbouche', 'Djemaa Ouled Chikh', 'Mekhatria', 'Bathia', 'Tachta Zegagha', 'Ain Bouyahia', 'El Maine', 'Tiberkanine', 'Belaas'],
  "45": ['Naama', 'Mechria', 'Ain Sefra', 'Tiout', 'Sfissifa', 'Moghrar', 'Assela', 'Djeniane Bourzeg', 'Ain Ben Khelil', 'Makman Ben Amer', 'Kasdir', 'El Biod'],
  "46": ['Ain Temouchent', 'Chaabet El Ham', 'Ain Kihal', 'Hammam Bouhadjar', 'Bou Zedjar', 'Oued Berkeche', 'Aghlal', 'Terga', 'Ain El Arbaa', 'Tamzoura', 'Chentouf', 'Sidi Ben Adda', 'Aoubellil', 'El Malah', 'Sidi Boumediene', 'Oued Sabah', 'Ouled Boudjemaa', 'Ain Tolba', 'El Amria', 'Hassi El Ghella', 'Hassasna', 'Ouled Kihal', 'Beni Saf', 'Sidi Safi', 'Oulhaca El Gheraba', 'Tadmaya', 'El Emir Abdelkader', 'El Messaid'],
  "47": ['Ghardaia', 'El Meniaa', 'Dhayet Bendhahoua', 'Berriane', 'Metlili', 'El Guerrara', 'El Atteuf', 'Zelfana', 'Sebseb', 'Bounoura', 'Hassi Fehal', 'Hassi Gara', 'Mansoura'],
  "48": ['Relizane', 'Oued Rhiou', 'Belaassel Bouzegza', 'Sidi Saada', 'Ouled Aiche', 'Sidi Lazreg', 'El Hamadna', 'Sidi Mhamed Ben Ali', 'Mediouna', 'Sidi Khettab', 'Ammi Moussa', 'Zemmoura', 'Beni Dergoun', 'Djidiouia', 'El Guettar', 'Hamri', 'El Matmar', 'Sidi Mhamed Ben Aouda', 'Ain Tarek', 'Oued Essalem', 'Ouarizane', 'Mazouna', 'Kalaa', 'Ain Rahma', 'Yellel', 'Oued El Djemaa', 'Ramka', 'Mendes', 'Lahlef', 'Beni Zentis', 'Souk El Haad', 'Dar Ben Abdellah', 'El Hassi', 'Had Echkalla', 'Bendaoud', 'El Ouldja', 'Merdja Sidi Abed', 'Ouled Sidi Mihoub'],
  "49": ['Charouine', 'Ouled Aissa', 'Talmine', 'Ouled Said', 'Timimoun', 'Ksar Kaddour', 'Tinerkouk', 'Aougrout', 'Deldoul', 'Metarfa'],
  "50": ['Bordj Badji Mokhtar', 'Timiaouine'],
  "51": ['Chaiba', 'Doucen', 'Ouled Djellal', 'Besbes', 'Ras El Miad', 'Sidi Khaled'],
  "52": ['Ksabi', 'Ouled-Khodeir', 'Beni-Abbes', 'Tamtert', 'Igli', 'El Ouata', 'Beni-Ikhlef', 'Kerzaz', 'Timoudi'],
  "53": ['Inghar', 'Ain Saleh', 'Foggaret Ezzoua'],
  "54": ['Ain Guezzam', 'Tin Zouatine'],
  "55": ['Nezla', 'Tebesbest', 'Touggourt', 'Zaouia El Abidia', 'El Alia', 'El-Hadjira', 'Benaceur', "M'naguer", 'Taibet', 'Blidet Amor', 'Temacine', 'Megarine', 'Sidi Slimane'],
  "56": ['Bordj el Haouass', 'Djanet'],
  "57": ['M\'rara', 'Sidi Amrane', 'Tenedla', 'El-M\'ghaier', 'Oum Touyour', 'Sidi Khelil', 'Still', 'Djamaa'],
  "58": ['El Meniaa', 'Hassi Gara', 'Hassi Fehal'],
  
  };

  if (communesByWilaya[wilaya]) {
    communesByWilaya[wilaya].sort().forEach(commune => {
      const option = document.createElement('option');
      option.value = commune;
      option.textContent = commune;
      communeSelect.appendChild(option);
    });
  }
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const data = {
    product: productLabel.textContent,
    price: document.getElementById('basePrice').value,
    fullname: document.getElementById('fullname').value,
    phone: document.getElementById('phone').value,
    productCount: document.getElementById('productCount').value,
    deliveryOption: document.getElementById('deliveryOption').value,
    wilaya: document.getElementById('wilaya').value,
    commune: document.getElementById('commune').value,
    address: document.getElementById('address').value,
    total: calculateTotal()
  };

  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      document.getElementById('thankyouMessage').style.display = 'block';
      form.reset();
    } else {
      alert('خطأ في إرسال الطلب، حاول مرة أخرى');
    }
  })
  .catch(error => {
    console.error('Error!', error.message);
    alert('حدث خطأ أثناء الإرسال، حاول لاحقًا');
  });
});

// Auto-select first product on load
window.onload = () => {
  const firstProduct = document.querySelector('.product-item');
  if (firstProduct) firstProduct.click();
};
