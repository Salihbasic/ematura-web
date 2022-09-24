import { BugReportOutlined, GitHub, QuestionMarkOutlined, ReceiptLongOutlined } from "@mui/icons-material";
import { Chip, Divider, Link, Typography } from "@mui/material"
import React from "react";
import { useState } from "react"
import "./stylesheets/Welcome.css"

export default function Welcome() {

    const [currentContent, setCurrentContent] = useState<string | null>(null);
    /* 
        If the same value has already been set, it'll be reset to null. This way, clicking on the chip
        that is already open immediately closes it.
    */
    const handleChips = (testVal: string) => currentContent === testVal ? setCurrentContent(null) : setCurrentContent(testVal)

    return (

        <div className="welcome">

            <div className="welcome-header">

                <Typography variant="h4">
                    eMatura
                </Typography>

                <Typography variant="caption">
                    Platforma za pripremu eksterne mature
                </Typography>

                <div className="welcome-chips">

                    <Chip label="O platformi"
                        size="medium"
                        variant="outlined"
                        icon={ <QuestionMarkOutlined /> }
                        onClick={() => handleChips("oplatformi")} />

                    <Chip label="Impressum"
                        size="medium"
                        variant="outlined"
                        icon={ <ReceiptLongOutlined /> }
                        onClick={() => handleChips("impressum")} />

                    <Chip label="Prijavi grešku"
                        size="medium"
                        variant="outlined"
                        icon={ <BugReportOutlined /> }
                        onClick={() => handleChips("bugreport")} />

                    <Chip clickable 
                        label="GitHub" 
                        size="medium"
                        variant="outlined"
                        icon={ <GitHub /> }
                        href="https://github.com/eMatura/ematura-web" 
                        component="a" />

                </div>

            </div>

            {(currentContent === "oplatformi") && <OPlatformi />}
            {(currentContent === "impressum") && <Impressum />}
            {(currentContent === "bugreport") && <BugReport />}

        </div>

    )

}

function OPlatformi() {

    return (

        <div className="welcome-main">

            <Typography variant="h5">
                O platformi
            </Typography>

            <Divider />

            <Typography variant="body1">
                Tuzlanski kanton već decenijama provodi ispit eksterne mature obavezan za sve učenika završnih razreda
                srednjih tehničkih škola i gimnazija. S obzirom da je polaganje ovog ispita uslov uspješnog završetka
                srednješkolskog obrazovanja, neophodno je da se učenici dobro pripreme za sam test, kako bi postigli što
                bolje rezultate.
            </Typography>
            
            <Typography variant="body1">
                Cilj ove platforme je da svim učenicima srednjih škola olakša pripremu za eksternu maturu tako što će im ponuditi
                jednostavan način da prerađuju sve već postojeće materijale na jednom mjestu u elektronskom formatu, ali
                isto tako i niz korisnih uputa, predavanja i informacija, uz maksimalnu tačnost i provjerenost svih podataka.
            </Typography>

        </div>

    )

}

function Impressum() {

    return (

        <div className="welcome-main">

            <Typography variant="h5">
                Impressum
            </Typography>

            <Divider />

            <Typography variant="h6">
                Autor
            </Typography>
            <Typography variant="body1">
                Mahir Salihbašić
            </Typography>

            <Typography variant="h6">
                Kontakt
            </Typography>
            <Typography variant="body1">
                mahir.salihbasic@protonmail.com
            </Typography>

            <Typography variant="body1">
                Platforma eMatura ne prikuplja podatke svojih korisnika. Sve interakcije korisnika sa platformom su isključivo
                na strani korisnika.
            </Typography>

            <Typography variant="body1">
                Platforma eMatura je platforma otvorenog koda koji se može pronaći na njenom <Link href="https://github.com/eMatura/ematura-web">GitHub repozitoriju</Link>.
            </Typography>
            
        </div>

    )

}

function BugReport() {

    return (
        
        <div className="welcome-main">

            <Typography variant="h5">
                Prijavi grešku
            </Typography>

            <Divider />

            <Typography variant="body1">
                Primijetili ste grešku na web platformi? Molimo vas da je prijavite uz što više detalja 
                na <Link href="https://github.com/eMatura/ematura-web/issues">našem GitHub repozitoriju</Link>.
            </Typography>

            <Typography variant="body1">
                Primijetili ste grešku u pitanjima ili odgovorima? Molimo vas da je prijavite na 
                e-mail: <Link href="mailto:mahir.salihbasic@protonmail.com">mahir.salihbasic@protonmail</Link>.
                U prijavi trebate navesti u kojem pitanju ste pronašli grešku i, ako ste u mogućnosti, 
                ispravak zajedno sa izvorom koji potkrepljuje njegovu tačnost.
            </Typography>

        </div>

    )

}