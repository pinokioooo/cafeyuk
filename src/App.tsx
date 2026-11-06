import { FormEvent, ReactNode, useMemo, useState } from "react";

type Page =
  | "home"
  | "discover"
  | "benefit"
  | "events"
  | "favorites"
  | "notifications"
  | "profile"
  | "detail";

type Cafe = {
  id: number;
  name: string;
  image: string;
  rating: string;
  distance: string;
  price: string;
  tags: string[];
  open: string;
};

const cafes: Cafe[] = [
  {
    id: 1,
    name: "Kopi Kita",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=85",
    rating: "4,8",
    distance: "0,8 km",
    price: "Rp16.000–Rp38.000",
    tags: ["Nugas", "WiFi"],
    open: "22.00",
  },
  {
    id: 2,
    name: "Titik Temu Coffee",
    image:
      "https://images.unsplash.com/photo-1685718913827-4321d75a19cd?auto=format&fit=crop&w=900&q=85",
    rating: "4,7",
    distance: "1,2 km",
    price: "Rp18.000–Rp45.000",
    tags: ["Santai", "Outdoor"],
    open: "23.00",
  },
  {
    id: 3,
    name: "Ruang Seduh",
    image:
      "https://images.unsplash.com/photo-1698466631860-0886a4f0c2c3?auto=format&fit=crop&w=900&q=85",
    rating: "4,9",
    distance: "1,6 km",
    price: "Rp20.000–Rp48.000",
    tags: ["Date", "Cozy"],
    open: "22.30",
  },
  {
    id: 4,
    name: "Sore Hari",
    image:
      "https://images.unsplash.com/photo-1568055113513-f9e0f8d7b1dd?auto=format&fit=crop&w=900&q=85",
    rating: "4,6",
    distance: "2,1 km",
    price: "Rp15.000–Rp35.000",
    tags: ["Hemat", "Colokan"],
    open: "21.30",
  },
];

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: "home", label: "Beranda", icon: "home" },
  { id: "discover", label: "Discover", icon: "sparkle" },
  { id: "benefit", label: "Benefit", icon: "gift" },
  { id: "events", label: "Event", icon: "calendar" },
  { id: "favorites", label: "Favorit", icon: "heart" },
];

const paths: Record<string, ReactNode> = {
  home: (
    <>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10M9 20v-6h6v6" />
    </>
  ),
  sparkle: (
    <path d="m12 2 1.6 5.1L19 9l-5.4 1.9L12 16l-1.6-5.1L5 9l5.4-1.9L12 2Zm7 13 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
  ),
  gift: (
    <>
      <rect x="3" y="8" width="18" height="13" rx="2" />
      <path d="M12 8v13M3 12h18M12 8H7.5a2.5 2.5 0 1 1 0-5c3.5 0 4.5 5 4.5 5Zm0 0h4.5a2.5 2.5 0 1 0 0-5C13 3 12 8 12 8Z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  arrow: <path d="m9 18 6-6-6-6" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  route: (
    <>
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="5" r="2" />
      <path d="M8 19h3a3 3 0 0 0 3-3V8a3 3 0 0 1 3-3" />
    </>
  ),
  minus: <path d="M5 12h14" />,
  plus: <path d="M12 5v14M5 12h14" />,
};

function Icon({
  name,
  size = 20,
  filled = false,
}: {
  name: string;
  size?: number;
  filled?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <button className="logo" aria-label="CafeYuk - Beranda">
      <span className="logo-mark">
        <span />
      </span>
      {!compact && (
        <span className="logo-word">
          Cafe<span>Yuk</span>
          <small>Discover. Taste. Repeat.</small>
        </span>
      )}
    </button>
  );
}

function DecorativeShapes() {
  return (
    <div className="decor-shapes" aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
  );
}

function Header({ page, setPage }: { page: Page; setPage: (page: Page) => void }) {
  return (
    <header className="topbar">
      <Logo />
      <nav className="desktop-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={
              page === item.id || (page === "detail" && item.id === "discover") ? "active" : ""
            }
            onClick={() => setPage(item.id)}
          >
            <Icon name={item.icon} size={16} filled={item.icon === "heart"} />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="header-actions">
        <button className="notification-button" onClick={() => setPage("notifications")}>
          <Icon name="bell" size={18} /> <span>Notifikasi</span>
          <b>3</b>
        </button>
        <button className="avatar" onClick={() => setPage("profile")}>
          A
        </button>
      </div>
    </header>
  );
}

function MobileNav({ page, setPage }: { page: Page; setPage: (page: Page) => void }) {
  return (
    <nav className="mobile-nav">
      {navItems.slice(0, 4).map((item) => (
        <button
          key={item.id}
          className={page === item.id ? "active" : ""}
          onClick={() => setPage(item.id)}
        >
          <Icon name={item.icon} size={20} filled={item.icon === "heart"} />
          <span>{item.label}</span>
        </button>
      ))}
      <button className={page === "profile" ? "active" : ""} onClick={() => setPage("profile")}>
        <Icon name="user" size={20} />
        <span>Profil</span>
      </button>
    </nav>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>;
}

function CafeCard({
  cafe,
  favorite,
  toggleFavorite,
  openDetail,
}: {
  cafe: Cafe;
  favorite: boolean;
  toggleFavorite: () => void;
  openDetail: () => void;
}) {
  return (
    <article className="cafe-card">
      <button className="card-image" onClick={openDetail} aria-label={`Lihat ${cafe.name}`}>
        <img src={cafe.image} alt={`Suasana ${cafe.name}`} />
        <span className="distance">
          <Icon name="pin" size={14} /> {cafe.distance}
        </span>
      </button>
      <button
        className={`heart-button ${favorite ? "saved" : ""}`}
        onClick={toggleFavorite}
        aria-label={favorite ? "Hapus dari favorit" : "Simpan ke favorit"}
      >
        <Icon name="heart" size={19} filled={favorite} />
      </button>
      <div className="card-content" onClick={openDetail}>
        <h3>{cafe.name}</h3>
        <p>
          <span className="star">★</span> {cafe.rating} <i>•</i> Buka s.d. {cafe.open}
        </p>
        <div>
          {cafe.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </article>
  );
}

function Login({ onLogin }: { onLogin: () => void }) {
  const [register, setRegister] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onLogin();
  };
  return (
    <main className="login-page">
      <DecorativeShapes />
      <section className="login-brand">
        <Logo />
        <h1>
          Lagi cari tempat buat nugas
          <br />
          atau santai? Temukan pilihanmu
          <br />
          di CafeYuk.
        </h1>
        <div className="brand-mosaic">
          <div className="drink-photo">
            <img
              src="https://images.unsplash.com/photo-1527156231393-7023794f363c?auto=format&fit=crop&w=500&q=85"
              alt="Es kopi susu"
            />
          </div>
          <div className="slogan">
            Discover.
            <br />
            Taste.
            <br />
            Repeat.
            <span />
          </div>
          <div className="app-tile">
            <span className="logo-mark">
              <span />
            </span>
          </div>
        </div>
      </section>
      <form className="login-card" onSubmit={submit}>
        <div className="mobile-login-logo">
          <Logo />
        </div>
        <p className="eyebrow">
          {register ? "Mulai jelajahi café favoritmu" : "Selamat datang kembali"}
        </p>
        <h2>{register ? "Buat akun" : "Masuk"}</h2>
        {register && (
          <label>
            Nama lengkap
            <input required placeholder="Nama kamu" />
          </label>
        )}
        <label>
          Email atau nomor HP
          <input required type="text" placeholder="contoh@email.com" />
        </label>
        <label>
          Password
          <input required type="password" placeholder="Minimal 8 karakter" />
        </label>
        {!register && (
          <button type="button" className="forgot">
            Lupa password?
          </button>
        )}
        <button className="primary wide" type="submit">
          {register ? "Daftar sekarang" : "Masuk"}
        </button>
        <div className="divider">
          <span>atau</span>
        </div>
        <button type="button" className="google" onClick={onLogin}>
          <strong>G</strong> Lanjut dengan Google
        </button>
        <p className="switch-auth">
          {register ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
          <button type="button" onClick={() => setRegister(!register)}>
            {register ? "Masuk" : "Daftar"}
          </button>
        </p>
        <p className="demo-hint">Mode demo — gunakan data apa saja untuk masuk</p>
      </form>
    </main>
  );
}

function Home({
  setPage,
  openCafe,
  favorites,
  toggleFavorite,
}: {
  setPage: (p: Page) => void;
  openCafe: (c: Cafe) => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
}) {
  const [mood, setMood] = useState("Dekat saya");
  const [query, setQuery] = useState("");
  const moods = ["Dekat saya", "Nugas", "Date", "Santai", "Hemat"];
  return (
    <>
      <section className="hero">
        <DecorativeShapes />
        <div className="container hero-inner">
          <p className="hello">Hai, Aurellia</p>
          <h1>
            Cari café sesuai <span>mood</span> kamu
          </h1>
          <p className="hero-copy">
            Temukan tempat yang pas untuk setiap momenmu, mulai dari fokus nugas sampai ngobrol
            santai.
          </p>
          <form
            className="search-row"
            onSubmit={(e) => {
              e.preventDefault();
              setPage("discover");
            }}
          >
            <div className="search-input">
              <Icon name="search" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari café, resto, atau dessert..."
              />
            </div>
            <button className="primary">
              <Icon name="search" size={17} /> Cari
            </button>
          </form>
          <div className="mood-list">
            {moods.map((item) => (
              <button
                key={item}
                onClick={() => setMood(item)}
                className={mood === item ? "active" : ""}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>
      <div className="container home-content">
        <section className="promo-banner">
          <div>
            <small>PROMO MEMBER</small>
            <h2>Ngopi lebih hemat, mood makin nikmat.</h2>
            <p>Diskon hingga 50% khusus member CafeYuk.</p>
          </div>
          <div className="promo-art">
            <div className="cup">CY</div>
            <i />
            <i />
          </div>
          <button onClick={() => setPage("benefit")}>
            Lihat promo <Icon name="arrow" size={17} />
          </button>
        </section>
        <section className="nearby-section">
          <div className="section-heading">
            <div>
              <p>PILIHAN DI SEKITARMU</p>
              <h2>Café terdekat</h2>
            </div>
            <button onClick={() => setPage("discover")}>
              Lihat semua <Icon name="arrow" size={16} />
            </button>
          </div>
          <div className="card-grid">
            {cafes.map((cafe) => (
              <CafeCard
                key={cafe.id}
                cafe={cafe}
                favorite={favorites.includes(cafe.id)}
                toggleFavorite={() => toggleFavorite(cafe.id)}
                openDetail={() => openCafe(cafe)}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function Discover({
  openCafe,
  favorites,
  toggleFavorite,
}: {
  openCafe: (c: Cafe) => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
}) {
  const [filter, setFilter] = useState("Semua");
  const [sort, setSort] = useState("Terdekat");
  const filters = ["Semua", "Dekat saya", "Budget", "Nugas", "WiFi", "Colokan"];
  const shown = useMemo(
    () =>
      filter === "Semua" || filter === "Dekat saya" || filter === "Budget"
        ? cafes
        : cafes.filter((c) => c.tags.includes(filter)),
    [filter],
  );
  return (
    <main className="page container">
      <div className="page-title">
        <div>
          <p>JELAJAHI TEMPAT BARU</p>
          <h1>Discover café</h1>
          <span>{shown.length} café sesuai pilihanmu</span>
        </div>
        <div className="compact-search">
          <Icon name="search" />
          <input placeholder="Cari café..." />
        </div>
      </div>
      <div className="filter-bar">
        <div>
          {filters.map((f) => (
            <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
        <label>
          Urutkan{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option>Terdekat</option>
            <option>Rating tertinggi</option>
            <option>Harga terendah</option>
          </select>
        </label>
      </div>
      <div className="discover-layout">
        <div className="list-grid">
          {shown.map((cafe) => (
            <CafeCard
              key={cafe.id}
              cafe={cafe}
              favorite={favorites.includes(cafe.id)}
              toggleFavorite={() => toggleFavorite(cafe.id)}
              openDetail={() => openCafe(cafe)}
            />
          ))}
        </div>
        <aside className="map-panel">
          <div className="map-roads" />
          {cafes.map((c, i) => (
            <button key={c.id} className={`map-pin p${i + 1}`} onClick={() => openCafe(c)}>
              {i + 1}
            </button>
          ))}
          <button className="map-search">
            <Icon name="search" size={16} /> Cari di area ini
          </button>
        </aside>
      </div>
    </main>
  );
}

function Detail({
  cafe,
  favorite,
  toggleFavorite,
  back,
  notify,
}: {
  cafe: Cafe;
  favorite: boolean;
  toggleFavorite: () => void;
  back: () => void;
  notify: (s: string) => void;
}) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const menu = [
    { name: "Americano", price: 16000 },
    { name: "Café Latte", price: 22000 },
    { name: "Caramel Macchiato", price: 28000 },
  ];
  const total = menu.reduce((sum, item) => sum + item.price * (cart[item.name] || 0), 0);
  const change = (name: string, amount: number) =>
    setCart({ ...cart, [name]: Math.max(0, (cart[name] || 0) + amount) });
  return (
    <main className="detail-page">
      <div className="detail-hero">
        <img src={cafe.image} alt={`Interior ${cafe.name}`} />
        <button className="back-button" onClick={back}>
          ← Kembali
        </button>
        <div className="detail-gallery">
          <img
            src="https://images.unsplash.com/photo-1527156231393-7023794f363c?auto=format&fit=crop&w=400&q=80"
            alt="Minuman kopi"
          />
          <img
            src="https://images.unsplash.com/photo-1621221814951-fa755dd0c993?auto=format&fit=crop&w=400&q=80"
            alt="Menu kopi"
          />
        </div>
      </div>
      <div className="container detail-content">
        <section className="detail-main">
          <div className="detail-heading">
            <div>
              <p className="breadcrumbs">Discover / {cafe.name}</p>
              <h1>{cafe.name}</h1>
              <p>
                <span className="star">★</span> {cafe.rating} (1,2 rb ulasan) <i>•</i>{" "}
                {cafe.distance} <i>•</i> Buka s.d. {cafe.open}
              </p>
              <div>
                {cafe.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}{" "}
                <Tag>Budget Friendly</Tag>
              </div>
            </div>
            <div>
              <button
                className={`save-detail ${favorite ? "active" : ""}`}
                onClick={toggleFavorite}
              >
                <Icon name="heart" filled={favorite} /> {favorite ? "Tersimpan" : "Simpan"}
              </button>
              <button className="primary">
                <Icon name="route" /> Rute
              </button>
            </div>
          </div>
          <div className="tab-line">
            <button className="active">Menu</button>
            <button>Fasilitas</button>
            <button>Ulasan</button>
            <button>Promo</button>
          </div>
          <div className="menu-section">
            <div className="section-heading">
              <div>
                <p>PALING DISUKAI</p>
                <h2>Menu populer</h2>
              </div>
            </div>
            {menu.map((item) => (
              <div className="menu-item" key={item.name}>
                <div className="menu-thumb">
                  <img
                    src={
                      item.name === "Americano"
                        ? "https://images.unsplash.com/photo-1527678357412-ef45dfbd9ecc?auto=format&fit=crop&w=300&q=80"
                        : "https://images.unsplash.com/photo-1527156231393-7023794f363c?auto=format&fit=crop&w=300&q=80"
                    }
                    alt={item.name}
                  />
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <p>Racikan khas dengan biji kopi pilihan</p>
                  <strong>Rp{item.price.toLocaleString("id-ID")}</strong>
                </div>
                <div className="quantity">
                  {cart[item.name] ? (
                    <>
                      <button onClick={() => change(item.name, -1)}>
                        <Icon name="minus" size={16} />
                      </button>
                      <b>{cart[item.name]}</b>
                    </>
                  ) : null}
                  <button onClick={() => change(item.name, 1)}>
                    <Icon name="plus" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="facilities">
            <h2>Fasilitas</h2>
            <div>
              <span>
                <Icon name="sparkle" /> WiFi cepat
              </span>
              <span>
                <Icon name="check" /> Banyak colokan
              </span>
              <span>
                <Icon name="check" /> Area outdoor
              </span>
              <span>
                <Icon name="check" /> Mushola
              </span>
            </div>
          </div>
        </section>
        <aside className="order-card">
          <p>RINGKASAN PESANAN</p>
          <h2>Pesananmu</h2>
          <span>{cafe.name} · Ambil 15 menit lagi</span>
          <div className="order-lines">
            {menu
              .filter((m) => cart[m.name])
              .map((m) => (
                <div key={m.name}>
                  <span>
                    {m.name} ×{cart[m.name]}
                  </span>
                  <b>Rp{(m.price * cart[m.name]).toLocaleString("id-ID")}</b>
                </div>
              ))}
            {total === 0 && <div className="empty-cart">Belum ada menu dipilih</div>}
          </div>
          <div className="total">
            <span>Total</span>
            <strong>Rp{total.toLocaleString("id-ID")}</strong>
          </div>
          <label>
            Metode pembayaran
            <select>
              <option>QRIS</option>
              <option>E-Wallet</option>
              <option>Bayar di kasir</option>
            </select>
          </label>
          <button
            disabled={!total}
            className="primary wide"
            onClick={() => notify("Pesanan berhasil dikonfirmasi")}
          >
            Konfirmasi Pesanan
          </button>
        </aside>
      </div>
    </main>
  );
}

function Benefit({ notify }: { notify: (s: string) => void }) {
  return (
    <main className="page container benefit-page">
      <div className="member-hero">
        <div>
          <p>CAFEYUK MEMBER</p>
          <h1>
            Lebih sering ngopi,
            <br />
            lebih banyak <span>untungnya.</span>
          </h1>
          <p>Voucher eksklusif, poin berlipat, dan kejutan spesial untuk setiap kunjunganmu.</p>
          <button className="primary" onClick={() => notify("Paket Gold dipilih")}>
            Upgrade ke Gold <Icon name="arrow" />
          </button>
        </div>
        <div className="member-card">
          <div className="member-card-top">
            <Logo compact />
            <span>GOLD</span>
          </div>
          <div>
            <small>MEMBER</small>
            <h2>Aurellia</h2>
            <p>Level 2 · Coffee Lover</p>
          </div>
          <b>
            350 <small>POIN</small>
          </b>
        </div>
      </div>
      <section className="benefit-section">
        <div className="section-heading">
          <div>
            <p>PAKET MEMBERSHIP</p>
            <h2>Pilih yang paling pas</h2>
          </div>
        </div>
        <div className="plans">
          <div className="plan">
            <h3>Silver</h3>
            <p>Untuk penikmat kopi santai.</p>
            <strong>
              Rp29.000 <small>/bulan</small>
            </strong>
            <ul>
              <li>
                <Icon name="check" /> Diskon 10% setiap hari
              </li>
              <li>
                <Icon name="check" /> 2 voucher setiap bulan
              </li>
              <li>
                <Icon name="check" /> Bonus ulang tahun
              </li>
            </ul>
            <button onClick={() => notify("Paket Silver dipilih")}>Pilih Silver</button>
          </div>
          <div className="plan featured">
            <span>PALING POPULER</span>
            <h3>Gold</h3>
            <p>Untuk coffee lover sejati.</p>
            <strong>
              Rp59.000 <small>/bulan</small>
            </strong>
            <ul>
              <li>
                <Icon name="check" /> Diskon 20% setiap hari
              </li>
              <li>
                <Icon name="check" /> Promo Buy 1 Get 1
              </li>
              <li>
                <Icon name="check" /> Poin 2× lebih cepat
              </li>
            </ul>
            <button onClick={() => notify("Paket Gold dipilih")}>Pilih Gold</button>
          </div>
          <div className="points-card">
            <p>POIN KAMU</p>
            <h3>
              350 <small>poin</small>
            </h3>
            <div className="progress">
              <i />
            </div>
            <span>70/100 menuju Level 3</span>
            <div className="reward">
              <Icon name="gift" />
              <div>
                <b>Americano gratis</b>
                <span>300 poin</span>
              </div>
              <button onClick={() => notify("Reward berhasil ditukar")}>Tukar</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Events({ notify }: { notify: (s: string) => void }) {
  const data = [
    {
      type: "Café Hopping",
      title: "Jelajah Kopi Senopati",
      date: "24 Agustus · 09.00",
      image: cafes[0].image,
    },
    {
      type: "Workshop",
      title: "Brew Your Own Coffee",
      date: "31 Agustus · 13.00",
      image:
        "https://images.unsplash.com/photo-1775991072530-9a8e3148830f?auto=format&fit=crop&w=900&q=85",
    },
    {
      type: "Coffee Talk",
      title: "Cerita di Balik Secangkir Kopi",
      date: "7 September · 16.00",
      image: cafes[2].image,
    },
  ];
  return (
    <main className="page container">
      <div className="page-title">
        <div>
          <p>TEMU, NGOPI, BERBAGI</p>
          <h1>Event & Komunitas</h1>
          <span>Temukan pengalaman baru bersama coffee lovers lainnya.</span>
        </div>
      </div>
      <div className="event-filters">
        <button className="active">Semua</button>
        <button>Café Hopping</button>
        <button>Workshop</button>
        <button>Coffee Talk</button>
      </div>
      <div className="event-grid">
        {data.map((event) => (
          <article className="event-card" key={event.title}>
            <img src={event.image} alt={event.title} />
            <div>
              <Tag>{event.type}</Tag>
              <h2>{event.title}</h2>
              <p>
                <Icon name="calendar" size={17} /> {event.date}
              </p>
              <p>
                <Icon name="pin" size={17} /> Jakarta Selatan
              </p>
              <button className="primary" onClick={() => notify(`Terdaftar di ${event.title}`)}>
                Daftar event <Icon name="arrow" size={17} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

function Favorites({
  favoriteCafes,
  openCafe,
  toggleFavorite,
}: {
  favoriteCafes: Cafe[];
  openCafe: (c: Cafe) => void;
  toggleFavorite: (id: number) => void;
}) {
  return (
    <main className="page container">
      <div className="page-title">
        <div>
          <p>TERSIMPAN UNTUKMU</p>
          <h1>Favorit</h1>
          <span>Café dan menu yang ingin kamu kunjungi lagi.</span>
        </div>
      </div>
      {favoriteCafes.length ? (
        <div className="card-grid favorites-grid">
          {favoriteCafes.map((c) => (
            <CafeCard
              key={c.id}
              cafe={c}
              favorite
              toggleFavorite={() => toggleFavorite(c.id)}
              openDetail={() => openCafe(c)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Icon name="heart" size={44} />
          <h2>Belum ada favorit</h2>
          <p>Tekan ikon hati pada café yang kamu sukai.</p>
        </div>
      )}
    </main>
  );
}

function Notifications() {
  const notes = [
    [
      "Promo spesial untukmu",
      "Diskon 50% di Kopi Kita masih berlaku hari ini.",
      "Promo",
      "Baru saja",
    ],
    [
      "Poin kamu bertambah",
      "Kamu mendapatkan 20 poin dari kunjungan terakhir.",
      "Poin",
      "2 jam lalu",
    ],
    [
      "Event baru di dekatmu",
      "Jelajah Kopi Senopati dibuka untuk pendaftaran.",
      "Event",
      "Kemarin",
    ],
    [
      "Voucher hampir kedaluwarsa",
      "Pakai voucher Buy 1 Get 1 sebelum 30 Agustus.",
      "Promo",
      "2 hari lalu",
    ],
  ];
  return (
    <main className="page narrow-page container">
      <div className="page-title">
        <div>
          <p>JANGAN LEWATKAN</p>
          <h1>Notifikasi</h1>
          <span>Semua kabar terbaru dari CafeYuk.</span>
        </div>
      </div>
      <div className="notification-list">
        {notes.map((n, i) => (
          <article key={n[0]} className={i === 0 ? "unread" : ""}>
            <div className={`notification-icon n${i}`}>
              <Icon name={i === 1 ? "sparkle" : i === 2 ? "calendar" : "gift"} />
            </div>
            <div>
              <Tag>{n[2]}</Tag>
              <h3>{n[0]}</h3>
              <p>{n[1]}</p>
            </div>
            <time>{n[3]}</time>
          </article>
        ))}
      </div>
    </main>
  );
}

function Profile({ onLogout, notify }: { onLogout: () => void; notify: (s: string) => void }) {
  return (
    <main className="page container profile-page">
      <div className="profile-cover">
        <DecorativeShapes />
      </div>
      <section className="profile-card">
        <div className="profile-avatar">A</div>
        <div className="profile-name">
          <p>PROFIL SAYA</p>
          <h1>Aurellia Putri</h1>
          <span>Level 2 · Coffee Lover</span>
        </div>
        <button onClick={() => notify("Mode edit profil dibuka")}>Edit profil</button>
      </section>
      <section className="stats">
        <div>
          <strong>12</strong>
          <span>Kunjungan</span>
        </div>
        <div>
          <strong>350</strong>
          <span>Poin</span>
        </div>
        <div>
          <strong>4</strong>
          <span>Voucher</span>
        </div>
      </section>
      <div className="profile-columns">
        <section>
          <h2>Riwayat kunjungan</h2>
          {cafes.slice(0, 3).map((c, i) => (
            <div className="history" key={c.id}>
              <img src={c.image} alt="" />
              <div>
                <b>{c.name}</b>
                <span>{18 - i * 4} Agustus 2025</span>
              </div>
              <strong>+{20 - i * 5} poin</strong>
            </div>
          ))}
        </section>
        <section className="settings">
          <h2>Pengaturan</h2>
          {["Akun", "Membership", "Notifikasi", "Bantuan"].map((x) => (
            <button key={x} onClick={() => notify(`${x} dipilih`)}>
              {x}
              <Icon name="arrow" />
            </button>
          ))}
          <button className="logout" onClick={onLogout}>
            Keluar
            <Icon name="arrow" />
          </button>
        </section>
      </div>
    </main>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState<Page>("home");
  const [selectedCafe, setSelectedCafe] = useState<Cafe>(cafes[0]);
  const [favorites, setFavorites] = useState<number[]>([1]);
  const [toast, setToast] = useState("");

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };
  const toggleFavorite = (id: number) =>
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  const openCafe = (cafe: Cafe) => {
    setSelectedCafe(cafe);
    setPage("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const navigate = (to: Page) => {
    setPage(to);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  return (
    <div className="app-shell">
      <Header page={page} setPage={navigate} />
      {page === "home" && (
        <Home
          setPage={navigate}
          openCafe={openCafe}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      )}
      {page === "discover" && (
        <Discover openCafe={openCafe} favorites={favorites} toggleFavorite={toggleFavorite} />
      )}
      {page === "detail" && (
        <Detail
          cafe={selectedCafe}
          favorite={favorites.includes(selectedCafe.id)}
          toggleFavorite={() => toggleFavorite(selectedCafe.id)}
          back={() => navigate("discover")}
          notify={notify}
        />
      )}
      {page === "benefit" && <Benefit notify={notify} />}
      {page === "events" && <Events notify={notify} />}
      {page === "favorites" && (
        <Favorites
          favoriteCafes={cafes.filter((c) => favorites.includes(c.id))}
          openCafe={openCafe}
          toggleFavorite={toggleFavorite}
        />
      )}
      {page === "notifications" && <Notifications />}
      {page === "profile" && (
        <Profile
          notify={notify}
          onLogout={() => {
            setLoggedIn(false);
            setPage("home");
          }}
        />
      )}
      <MobileNav page={page} setPage={navigate} />
      {toast && (
        <div className="toast">
          <Icon name="check" size={18} />
          {toast}
        </div>
      )}
    </div>
  );
}
