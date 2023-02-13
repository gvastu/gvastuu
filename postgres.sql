--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Ubuntu 14.7-1.pgdg22.04+1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Category; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Category" AS ENUM (
    'ELECTRICO',
    'FUGA',
    'GAS',
    'OTROS'
);


ALTER TYPE public."Category" OWNER TO postgres;

--
-- Name: CommentAuthor; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."CommentAuthor" AS ENUM (
    'INQUILINO',
    'STAFF'
);


ALTER TYPE public."CommentAuthor" OWNER TO postgres;

--
-- Name: NotificationType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."NotificationType" AS ENUM (
    'PAYMENT'
);


ALTER TYPE public."NotificationType" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Announcement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Announcement" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    "isPublic" boolean DEFAULT false NOT NULL,
    archived boolean DEFAULT false NOT NULL,
    "authorId" text NOT NULL
);


ALTER TABLE public."Announcement" OWNER TO postgres;

--
-- Name: Booking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Booking" (
    contrato text NOT NULL,
    active boolean DEFAULT false NOT NULL,
    "startDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "endDate" timestamp(3) without time zone,
    duration integer,
    amount integer NOT NULL,
    "userId" text NOT NULL,
    "locationId" text NOT NULL
);


ALTER TABLE public."Booking" OWNER TO postgres;

--
-- Name: Comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Comment" (
    id text NOT NULL,
    comment text NOT NULL,
    "commentBy" public."CommentAuthor" DEFAULT 'INQUILINO'::public."CommentAuthor" NOT NULL,
    "messageId" text NOT NULL,
    dismissed boolean DEFAULT false NOT NULL,
    "dismissedBy" text[]
);


ALTER TABLE public."Comment" OWNER TO postgres;

--
-- Name: Location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Location" (
    id text NOT NULL,
    name text NOT NULL,
    address text NOT NULL,
    "isAvailable" boolean DEFAULT true NOT NULL,
    archived boolean DEFAULT false NOT NULL,
    "expiredNotice" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Location" OWNER TO postgres;

--
-- Name: Message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Message" (
    id text NOT NULL,
    title text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    body text NOT NULL,
    attachment text,
    category public."Category",
    notification public."NotificationType",
    "dismissedBy" text[],
    "isSolved" boolean DEFAULT false,
    archived boolean DEFAULT false NOT NULL,
    dismissed boolean DEFAULT false NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."Message" OWNER TO postgres;

--
-- Name: Payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Payment" (
    id text NOT NULL,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "dueDate" timestamp(3) without time zone,
    "overDue" boolean DEFAULT false NOT NULL,
    archived boolean DEFAULT false NOT NULL,
    amount integer NOT NULL,
    "locationId" text NOT NULL
);


ALTER TABLE public."Payment" OWNER TO postgres;

--
-- Name: Profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Profile" (
    id text NOT NULL,
    phone text NOT NULL,
    referral text NOT NULL,
    credential text NOT NULL,
    consent text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Profile" OWNER TO postgres;

--
-- Name: Recipient; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Recipient" (
    "announcementId" text NOT NULL,
    "userId" text NOT NULL,
    "isVisible" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."Recipient" OWNER TO postgres;

--
-- Name: Submission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Submission" (
    name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    referral text NOT NULL,
    credential text NOT NULL,
    consent text NOT NULL,
    "dismissedBy" text[],
    authorized boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Submission" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    "providerId" text NOT NULL,
    name text,
    email text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    account boolean DEFAULT false NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Data for Name: Announcement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Announcement" (id, "createdAt", title, content, "isPublic", archived, "authorId") FROM stdin;
\.


--
-- Data for Name: Booking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Booking" (contrato, active, "startDate", "endDate", duration, amount, "userId", "locationId") FROM stdin;
\.


--
-- Data for Name: Comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Comment" (id, comment, "commentBy", "messageId", dismissed, "dismissedBy") FROM stdin;
\.


--
-- Data for Name: Location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Location" (id, name, address, "isAvailable", archived, "expiredNotice") FROM stdin;
cl9xj1nuy0000pju1yqkswagi	Barbados 01	Unidad Integración Latinoamericana #2014, Ed. Barbados J-4	t	f	f
cl9xj1nuy0001pju1aegsbd6m	Barbados 02	Unidad Integración Latinoamericana #2014, Ed. Barbados J-4	t	f	f
cl9xj1nuy0002pju1g8x1ugdn	Barbados 03	Unidad Integración Latinoamericana #2014, Ed. Barbados J-4	t	f	f
cl9xj1nuy0003pju1007cwp93	Barbados 04	Unidad Integración Latinoamericana #2014, Ed. Barbados J-4	t	f	f
cl9xj1nuy0004pju1tlehhf2f	Barbados 05	Unidad Integración Latinoamericana #2014, Ed. Barbados J-4	t	f	f
cl9xj1nuy0005pju1avj5x2of	Barbados 06	Unidad Integración Latinoamericana #2014, Ed. Barbados J-4	t	f	f
cl9xj1nuy0006pju1c1fr8adw	Candelaria	Prol. Lázaro Cárdenaz #50-B	t	f	f
cl9xj1nuy0007pju1xmu5hrm8	Ecuador	Unidad Integración Latinoamericana #2014, Ed. Ecuador 206	t	f	f
cl9xj1nuy0008pju15p0ocsju	Guatemala 205	Unidad Integración Latinoamericana #2014, Ed. Guatemala C	t	f	f
cl9xj1nuy0009pju1siy84kwm	Guatemala 603	Unidad Integración Latinoamericana #2014, Ed. Guatemala C	t	f	f
cl9xj1nuy000apju1i050xve5	MAQ 06	MIGUEL ANGEL DE QUEVEDO 765, COLONIA BARRIO DEL NIÑO JESUS, COYOACAN	t	f	f
cl9xj1nuy000bpju1k2365x2e	MAQ 07	MIGUEL ANGEL DE QUEVEDO 765, COLONIA BARRIO DEL NIÑO JESUS, COYOACAN	t	f	f
cl9xj1nuy000cpju1qn4q9uwb	MAQ CAJON 42 Y/O 47	MIGUEL ANGEL DE QUEVEDO 765, COLONIA BARRIO DEL NIÑO JESUS, COYOACAN	t	f	f
cl9xj1nuy000dpju16fuurfuq	MAQ CAJON 43	MIGUEL ANGEL DE QUEVEDO 765, COLONIA BARRIO DEL NIÑO JESUS, COYOACAN	t	f	f
cl9xj1nuy000epju18ebljfu3	MEXICO G-201	UNIDAD INTEGRACION LATINOAMERICANA ED MEXICO ENTRADA G, ROMERO DE TERREROS, COYOACAN	t	f	f
cl9xj1nuy000fpju1q8gk0pts	ODONTOLOGIA 01	ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN	t	f	f
cl9xj1nuy000gpju1cdbmsmi9	ODONTOLOGIA 02	ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN	t	f	f
cl9xj1nuy000hpju1hswsfchw	ODONTOLOGIA 03	ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN	t	f	f
cl9xj1nuy000ipju1msf8jekn	ODONTOLOGIA 04	ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN	t	f	f
cl9xj1nuy000jpju1gr4ocytw	ODONTOLOGIA 05	ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN	t	f	f
cl9xj1nuy000kpju1h4m2n9b5	ODONTOLOGIA 06	ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN	t	f	f
cl9xj1nuy000lpju1jxb1cuaa	ODONTOLOGIA 07	ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN	t	f	f
cl9xj1nuy000mpju1y178qzs9	ODONTOLOGIA 08	ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN	t	f	f
cl9xj1nuy000npju1da3mx7bc	ODONTOLOGIA 09	ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN	t	f	f
cl9xj1nuy000opju1vzik9age	ODONTOLOGIA 10	ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN	t	f	f
cl9xj1nuy000ppju1yjuus46p	ODONTOLOGIA 11	ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN	t	f	f
cl9xj1nuy000qpju1dnzgta1o	ODONTOLOGIA 12	ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN	t	f	f
cl9xj1nuy000rpju1ygfpx4tt	ODONTOLOGIA 13	ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN	t	f	f
cl9xj1nuy000spju1po400bnj	ODONTOLOGIA 14	ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN	t	f	f
cl9xj1nuy000tpju1ifb3ch8r	ODONTOLOGIA 15	ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN	t	f	f
cl9xj1nuy000upju11wnjohhl	ODONTOLOGIA 16	ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN	t	f	f
cl9xj1nuy000vpju17pnehrr2	ODONTOLOGIA 17	ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN	t	f	f
cl9xj1nuy000wpju1vohxnri7	ODONTOLOGIA 18	ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN	t	f	f
cl9xj1nuy000xpju1t2qqunil	PACIFICO 301	AV. PACIFICO 219. LAS ROSAS, COYOACAN.	t	f	f
cl9xj1nuy000ypju1zw9ayarx	TLALPAN 02	CALZADA DE TLALPAN 1955, PARQUE SAN ANDRES, COYOACAN	t	f	f
cl9xj1nuy000zpju1sk4g13h9	TLALPAN 03	CALZADA DE TLALPAN 1955, PARQUE SAN ANDRES, COYOACAN	t	f	f
cl9xj1nuy0010pju1b5ie0rmk	WISCONSIN TORRE B- 308	CALLE WISCONSIN 118 TORRE B, DEPTO 308. COL. PALACIO DE LOS DEPORTES, BENITO JUAREZ	t	f	f
cl9xj1nuy0011pju1ieml7qa5	ARQUITECTURA 01	CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.	t	f	f
cl9xj1nuy0012pju17s6esno1	ARQUITECTURA 02	CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.	t	f	f
cl9xj1nuy0013pju15ohv9jon	ARQUITECTURA 03	CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.	t	f	f
cl9xj1nuy0014pju1uytru6x7	ARQUITECTURA 06	CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.	t	f	f
cl9xj1nuy0015pju1sut930ui	ARQUITECTURA 07	CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.	t	f	f
cl9xj1nuy0016pju1172sl4pi	ARQUITECTURA 08	CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.	t	f	f
cl9xj1nuy0017pju1v0niy3ik	ARQUITECTURA 09	CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.	t	f	f
cl9xj1nuy0018pju1b2pgm56v	ARQUITECTURA 10	CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.	t	f	f
cl9xj1nuy0019pju1w9mht8en	ARQUITECTURA 11	CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.	t	f	f
cl9xj1nuy001apju1ch9yqzml	ARQUITECTURA 12	CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.	t	f	f
cl9xj1nuy001bpju1rzbu9m1a	ARQUITECTURA 13	CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.	t	f	f
cl9xj1nuy001cpju1gcwzv7si	ARQUITECTURA 14	CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.	t	f	f
cl9xj1nuy001dpju150mf7e8q	ARQUITECTURA 15	CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.	t	f	f
cl9xj1nuy001epju1mk1vrk33	ARQUITECTURA 16	CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.	t	f	f
cl9xj1nuy001fpju1832iz3wp	ARQUITECTURA 17	CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.	t	f	f
cl9xj1nuy001gpju1p8hiqcuy	ARQUITECTURA 18	CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.	t	f	f
cl9xj1nuy001hpju1kfjbpycz	ARQUITECTURA 19	CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.	t	f	f
cl9xj1nuy001ipju16tzx3e55	ARQUITECTURA 20	CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.	t	f	f
cl9xj1nuy001jpju1wsosuqyq	ARQUITECTURA 21	CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.	t	f	f
cl9xj1nuy001kpju1dfxapj6o	ARQUITECTURA 22	CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.	t	f	f
cl9xj1nuy001lpju1koaosf5v	ARQUITECTURA 23	CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.	t	f	f
cl9xj1nuy001mpju140ga2y3c	ARQUITECTURA 24	CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.	t	f	f
cl9xj1nuy001npju1f5thmpjl	ARQUITECTURA 25	CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.	t	f	f
cl9xj1nuy001opju186udtwbg	ARQUITECTURA 26	CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.	t	f	f
\.


--
-- Data for Name: Message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Message" (id, title, "createdAt", "updatedAt", body, attachment, category, notification, "dismissedBy", "isSolved", archived, dismissed, "userId") FROM stdin;
\.


--
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Payment" (id, date, "dueDate", "overDue", archived, amount, "locationId") FROM stdin;
\.


--
-- Data for Name: Profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Profile" (id, phone, referral, credential, consent, "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Recipient; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Recipient" ("announcementId", "userId", "isVisible") FROM stdin;
\.


--
-- Data for Name: Submission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Submission" (name, email, phone, referral, credential, consent, "dismissedBy", authorized) FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, "providerId", name, email, "createdAt", "updatedAt", account) FROM stdin;
cl9xjim9i0000pjpx8g83ancz	114250313244860312239	Angel Del Castillo Guevara	admin@gvastuu.com	2022-11-01 01:37:32.214	2022-11-01 01:37:32.214	f
cl9xjizj30002pjpx8rskoixt	107129088989365744460	Comercial GV	comercial@gvastuu.com	2022-11-01 01:37:49.408	2022-11-01 01:37:49.408	f
\.


--
-- Name: Announcement Announcement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Announcement"
    ADD CONSTRAINT "Announcement_pkey" PRIMARY KEY (id);


--
-- Name: Comment Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);


--
-- Name: Location Location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Location"
    ADD CONSTRAINT "Location_pkey" PRIMARY KEY (id);


--
-- Name: Message Message_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_pkey" PRIMARY KEY (id);


--
-- Name: Payment Payment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_pkey" PRIMARY KEY (id);


--
-- Name: Profile Profile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Booking_locationId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Booking_locationId_key" ON public."Booking" USING btree ("locationId");


--
-- Name: Booking_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Booking_userId_key" ON public."Booking" USING btree ("userId");


--
-- Name: Comment_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Comment_id_key" ON public."Comment" USING btree (id);


--
-- Name: Message_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Message_id_key" ON public."Message" USING btree (id);


--
-- Name: Profile_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Profile_userId_key" ON public."Profile" USING btree ("userId");


--
-- Name: Recipient_announcementId_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Recipient_announcementId_userId_key" ON public."Recipient" USING btree ("announcementId", "userId");


--
-- Name: Submission_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Submission_email_key" ON public."Submission" USING btree (email);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_providerId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_providerId_key" ON public."User" USING btree ("providerId");


--
-- Name: Announcement Announcement_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Announcement"
    ADD CONSTRAINT "Announcement_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Booking Booking_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Location"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Booking Booking_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Comment Comment_messageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES public."Message"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Message Message_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Payment Payment_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Location"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Profile Profile_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Recipient Recipient_announcementId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Recipient"
    ADD CONSTRAINT "Recipient_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES public."Announcement"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Recipient Recipient_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Recipient"
    ADD CONSTRAINT "Recipient_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

