import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useMemo, useState } from "react";

import type { GalleryCategory } from "@/data/gallery";

import {
  PageHero,
  Section,
  SectionHeading,
} from "@/components/ui-kit";

/* ============================================================
   GOOGLE DRIVE IMAGE HELPERS
   ============================================================ */

/*
 * Smaller thumbnail size reduces bandwidth and helps prevent
 * Google Drive from throttling a large gallery.
 */
function driveImage(fileId: string) {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w640`;
}

function driveImageFallback(fileId: string) {
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

/* ============================================================
   DRIVE GALLERY DATA
   ============================================================ */

type DriveGalleryItem = {
  id: string;
  src: string;
  fallbackSrc: string;
  caption: string;
  category: GalleryCategory;
};

const driveGalleryItems: DriveGalleryItem[] = [];

/* ============================================================
   ADD DRIVE FILES
   ============================================================ */

function addDriveFiles(
  category: GalleryCategory,
  folderName: string,
  ids: string[],
) {
  ids.forEach((id, index) => {
    driveGalleryItems.push({
      id: `drive-${folderName}-${index}-${id}`,
      src: driveImage(id),
      fallbackSrc: driveImageFallback(id),
      caption: folderName,
      category,
    });
  });
}

/* ============================================================
   WATER RESTORATION
   ============================================================ */

addDriveFiles(
  "Environment" as GalleryCategory,
  "Aadur Malavanthangal Lake",
  [
    "1Atl30HZT8wu8_o2LeAOKC2OndmByMvLI",
  ],
);

addDriveFiles(
  "Environment" as GalleryCategory,
  "Erumananthangal Lake",
  [
    "12ofIsOVa-5XUdcYZsSWdqnoNPPQEs35f",
    "14wCcHnmM0kzHveZx2hscDpMP7eaRROdw",
    "17OQ3ZwWNT1m2LNG4pdH-4CHqK50JzgDZ",
    "18foh5dYc5lHxRnOMWbLOUl23OYfqE26G",
    "1Ojxv1aomgDfas-sdzwq5Y_3Arj26yogl",
    "1cbuYr0MhwH8qyInyDlyulUSGobivJpuk",
    "1qeF20Tb-nX2vLus39SFdqmqFU2hfZciX",
    "1yOoyqjZO9CxWMeHip3LqoL2cJ8K3R3NC",
  ],
);

addDriveFiles(
  "Environment" as GalleryCategory,
  "Inspection Team",
  [
    "1AbiUP7dzYNAzdSYpHlPVO642HISMUorV",
    "1CpuArNo_axVtGjZ5m8KyoJ2Z23ldn0Bu",
    "1TeuX-IiBTT34KAgc8D7q5UfzBPru_j8E",
    "1YI8zw8Q1Pmz9uNUif0R5AlaH2ae2eIYo",
    "1rQQu9ZvrrweyzECXfFlVPXwZ3S7WS-iP",
  ],
);

addDriveFiles(
  "Environment" as GalleryCategory,
  "Muthampalayam Lakes",
  [
    "13QQK4l7-DLx5CZBhRtRjJx8Zr0D__VEe",
    "1CwEjvjBJdFAALWJl79kahujCcZZPOvRD",
    "1JvS1Xrr6-i-989alaPiogfczZHsjo2tp",
    "1ODLaYSkIh_kt1uVxMYKTcLd0USuX0wVX",
    "1WCELTuL-2rz0BIr4gulmyS2Cwuj9FiIb",
    "1_mOAcPl862gizx94FxOig_AJY_aL_URO",
    "1ipvmQHb-CrCCNepLyAZPIVs8KxCY0hxO",
    "1rhhUlCflE4gKqJWN-aLkA_VpM11qRhMQ",
    "1t9FriB-zdp4udelNdcak8tpmI4FOaeym",
    "1w-qGoW4yOOBlRzF6Iml-m4-87yL6bzOe",
    "1zfXpMEAWrIwzaHX47jur8EDcUYeAdF39",
  ],
);

/* ============================================================
   DISASTER RELIEF
   ============================================================ */

addDriveFiles(
  "Relief" as GalleryCategory,
  "Disaster Relief",
  [
    "1-Hzr3gxNsqp-SITzgNOlW9aaVD1RTe0z",
    "13HER4lfuz-ZhOOnw7YL_msgXMxdXeQx1",
    "13cvOWjirXIW6E3l6iw__0-j4Q__vpM0z",
    "14Z0PLNEjX9ObGKH2oVoZoph1Atz6POBX",
    "15sHZxU9rudutV4p5J7CSo_Lz5wwKTC1y",
    "15zZOAfVs6qWc8XcXzCL4pxTdxY7glrie",
    "16Ax3tHOXD_ndmOjcSp5KTXo1c4Dub2lL",
    "17UCbIsvkIhLmkgTG6j-vAuCgWHzfdK8B",
    "17qD0QqDJRm9QBbbz23DsTGyCNc9cB-KM",
    "18oObQ_hJwVEPrfMEtXPz-GaRLgUGmjqO",
    "193J7ci69OCvRArwjH3_xvV4RdIIqKueZ",
    "19EQYKnpCOTgRbebIiZ04S5Xj-goDhXRU",
    "1C1IdS0d7mmWoWHzZbug_uYW1Y14v5y_M",
    "1CSl4R6sVzu2-Gq49a4pEu0SrMkVJ0kih",
    "1Ch5uWX4X1cLTXgbn-bVZvZPBdEFwpD2b",
    "1Ct4olSkjuY7LYkn8x6onAd3YpiFP7Ye9",
    "1DPwIO3hvWBkca95MAFt51P5evmwiUUnv",
    "1Dqr-yCRqEgVYUPmMUtTlEGO3oQ1DSdPr",
    "1EGh8MEY9-qT2O5CThtvt5bvALTRCAP1L",
    "1ETAwL9dD-g8rnNCLiEbt4Do_q_NV0J6v",
    "1F2rkiA0qwl8PVmUnJGd7qbPChNaMa7BM",
    "1FEn_vPT7Ox_uuRmMXVQpdt3b6Gl6rBmm",
    "1FFKU68ZnhfepFKJSVYIr6hG5wPp-llw7",
    "1FsZOPiAzjh1iawmeVLfmW6vS1WEv59B1",
    "1HFVGQHKDoI_KtINrzBmeFjQIvEeWYYQa",
    "1JPWYZc3QQsNyRJ7yxPdUTSCsNNS224IR",
    "1Ndl1qX1sPVWHg6NjGmqsmNZ_JLCXySJS",
    "1NsKWpABTrxKMQuav7wkBfDre_OfOV65h",
    "1OOyH5YuO6S3RqPdbs0RfJTSCZ60Sdkbp",
    "1PG-I9aJ3XliRo6cTWm5U9XmLbtXVH2NV",
    "1Q1H-2hWvUBKGC9rbzoIGw8xQByyCbKC5",
    "1TZqg3xqu4ihyG2YdluaJ6acEmqpDGSVT",
    "1ULeLcJvd3jLGIL9JpwCTrCt3-Ewh_J0",
    "1VTDBslS_q2R0EySaY4h8dhC7iBpcxUBm",
    "1VcBRCP3c-pTrsqOZxhVMPrRQe6cbXYLE",
    "1VlM6C13BLcAf_rgm90qnD-KRr9KN_RPn",
    "1W6YNN-ru3c7f9xVREi1koc7wJjbkOjjk",
    "1X3KI1BFdLQim9fw4lxBYSJIhKiirVaow",
    "1X6cdfuzb-_R3ttgy7S2aC_Ug1JLwQ9XC",
    "1X9LyvQBSpdva9gXKkpqbawY0WNMHwmrM",
    "1XH_AwL7DAaQh5Fn9rSZ6u9CDI2fonaMr",
    "1Y2gscpjhCEDccgVpZab6IPlhirb7aO6n",
    "1YYIIdrqXwYdrRhMKIceK526gcAbN3awH",
    "1ZZ8txhkK8yaAmkpiENS1q87ZCbBQTbzO",
    "1Zs0hY3lk7axeIBa-xxJKyQrrc5PqirIv",
    "1_abuuMbU3jrlLyuhdJL6LaS0obgE8RSl",
    "1aSjNE07W0WJIAg5HU60b3pkueX2YuUWY",
    "1aVnLOCQO_X2FF6BhalsbbmoGsLoGaDan",
    "1bAATB-D5dMedA5tdoCzaA5pedBYE0tbQ",
    "1beFOMajX9tyx4i2lgalTbi3oMTgheley",
    "1cBwzMoFMhIeBaXQH37LacOfhcX5EmKjQ",
    "1cHy83F9jHT26CInooUje0lMNiW-fuX7u",
    "1dXNGwfQcMcT5Jfu26rhgmMocJrpF-w_f",
    "1eP70KT19dWjkUtQyvItShNYBI7H-fFd-",
    "1f_JVLDjzQ-nFOq8AJRcVUCqyIwLmKTQL",
    "1fm4R_HWofOpE4jkLrSLkfkatDAEZW-9B",
    "1g8VqWKNS6rYfY1dXr76jzF5B8-FaOMg6",
    "1iYpGD00ya1Ut0laTPf3yZEG8IVZlCZv8",
    "1k0JcrF2Q7NwCgys4fJO5aFtJlZHaxaf3",
    "1lptOsXO9SscMQHYxjC9V-fCZtBjTAg-w",
    "1m9wv5dV3uOepDRAxSa1M7eQc01AjOAuP",
    "1oQnxknUNBO5XJxsk_3xVuj0pZG1uk1XW",
    "1oeytDCJ80pskJ5ExgnhVyJ0-A_k9PEap",
    "1on10d9wEe2FpDC78EcbZxWxrg6jELWcf",
    "1oth4Fdf94Kj6bg2sjDRx2kPMkw7Ab55O",
    "1rKB3hb5Wb0dSkvgzJj18bt3wE6keZfKq",
    "1u0ceg0hDkvwbow88weYlzy7rsWWNpmcK",
    "1uuYPAHSMzu3_1F60kpXtgK3pj7u2S-I9",
    "1vDRgFG8Hjpe60xNASwyn5xIyerXqD3VC",
    "1vzWqH99ku0SvJNxmIOIlSrMq4VzkwCQz",
    "1wIUveVpbRQv-zSyaVfiax1JcZ6C5Ygs8",
    "1zd9HLLttT9H2t9OT1h9gUJiu8wx_qy5g",
    "1zipCQDgm2fh5O9NmaxiZEaiAQ4lZ7AsT",
  ],
);

/* ============================================================
   BLOOD DONATION
   ============================================================ */

addDriveFiles(
  "Health" as GalleryCategory,
  "Blood Donation",
  [
    "18ik13DdhrMtjb3oUjAmzEEQpUWLBhEV_",
    "1OFuzWCOwSNdQWmLcp8-dbFMvgK9Rfg1n",
    "1fe1xD0CBlhseaQfbgML9Kb0YKow0PT22",
    "1jkhsVXomvL6WzeE_DZ-pTLcXF4m8Q2Fd",
    "1rfGjhOclTZqHGEb06rHMGP4aN1ShJC0K",
  ],
);

/* ============================================================
   EDUCATION
   ============================================================ */

addDriveFiles(
  "Education" as GalleryCategory,
  "Education",
  [
    "12RMFRQJaHc3mGKxatXvgL3J4jCQEDDfM",
    "19Yo3c2c2dnaiIfACTqWgmebAb3vc8TX5",
    "1Dup1zU-SE88deMzkvXni5Gg370xy6fSq",
    "1FvjM0ChJxWJ0fsGVaolXIeGQrhsHcQeM",
    "1QHyrK8GmK1YxuCmS0j_cl5NzoqHeYGFL",
    "1RpAvRwRz9w7Xg5YNNqcvQsVSBybzzFsn",
    "1ZpYcaBJWy2p0GFIGFui4rf-zOj6IfH0m",
    "1_v_NO6wysNCYAEy3cy1xbZqxSgrs7rmK",
    "1eQg_gLBuPKroJ9SX9-PsntaCzu5kNZuQ",
    "1eobO-ryfIG00uFadQPgmvFkccVcr3x1-",
    "1khtMy4Xzmw0jUrDVHD_Bjx9z-spP0u6L",
    "1ocaaQKMVluw_weuFX-bBYS1jqLE3XAUe",
    "1wCJkSpK3l93ewDPX4Ii9fkNdkfi5X8_w",
  ],
);

/* ============================================================
   CAREER SUPPORT
   ============================================================ */

addDriveFiles(
  "Career" as GalleryCategory,
  "Career Support",
  [
    "14eEl4wj0dMl9BG8K2Yjjj4VHNPD1-txP",
    "16Se6DGuYyfZAdVBOHHTCFSUGMoodLNNC",
    "17f-y9xaWd8MotFf3DCrYUms5Hx3ZSnmC",
    "1Al_QAa4HDF9R0njiaOOA_RW82AR1Xfk4",
    "1AzDytxb9tVq_dGI1WDFDQdkfPP4Id8MJ",
    "1GEU4qMS0JNwxp9w-YIpGBekKtx3-ligi",
    "1GXQa7ngNNpAfPSv5eLxK3B7bH_hsXX0b",
    "1HbfJ30P59wXs2b_qd8_LVlWnTSwShxoc",
    "1HyGSRgpJmHO1Z_p1rjdPWsL8_NT9WPr8",
    "1KnP9ASM8zT2L7l_gCAnQaN4_73O84tpv",
    "1NwS6xLsx_x3Pb0BYNwohW14ysCI39-lC",
    "1RPALZd1goNNLWOqbDiAoyX3S-Qgmt6Mx",
    "1U5kaus5oVevO8KUkoSAIvp04u-eQTI0p",
    "1UdS-g73A08QjLFcjOQKcGYlbVvW-wJXA",
    "1bZbaJllOY6yQZn8rq2C1N4C-VvAKzxcO",
    "1i4icJcDRtp9w_v23w00JKhIBeQYD6Cpg",
    "1iFHXlueEeLVBPLSIHenQBGWF25ye8gVT",
    "1iJzghoeYqLOLgKZ4UBR5zl7K5Ld49d-E",
    "1mqI-9_xdp-Vtueh6luHFa1erRYVw54aW",
    "1nWXrR2jwi9GlJKe0XwNQJK323_hgmxaR",
    "1okZGeqQ1uS-09U4TgXbObrBufN7B7W1L",
    "1pexKGfbAJ3YPYwLnXg4o_hQrccNQEQaG",
    "1qBtC25L1RpxiMDCR7ZgPTfmaxGsw8nlM",
    "1rQnkvV1iCfKZ97nI8mYv4VtyMkDzgnBN",
    "1tsY3Md9RLlj-MHb2I73PTApmsDtXGuYK",
  ],
);

/* ============================================================
   PROJECTS & IMPACT
   ============================================================ */

addDriveFiles(
  "Projects" as GalleryCategory,
  "Projects & Impact",
  [
    "13DVB7DdGn04_VNr0vQpK9ZaNDCUe3BQ2",
    "15a7MHpLwEOuQYEXXkodRmvQ1-b4_7SUn",
    "17jVP1UcSDxgzeDOzchVRn34dlyqXZ58C",
    "1937QdP_d-I0Ey9SFBfx4d80Fdx4NYJcA",
    "1BGIGwsww2FD0Z244JxZPnQ_hG6S9DW-n",
    "1DVEdCT1sGVTWw5u7jLn70pALWRVx8UI7",
    "1ELya9HyK4FseXtpmiTYtF81D29iHQNRa",
    "1Fmzo7xIoFPh5KQqOjMQXDnQuG5VLIvrZ",
    "1IVN-dgj3N1oaQZR7eEFeC3wgFCK92dmP",
    "1JF0HmLmrmwFHcwiHfC8HpM59jT4Qh5GA",
    "1LKKyY7S0Z33Bp9tpCOEYIBLSIMoDUjTp",
    "1MrJjUDkCN1_5E3eSEiBf_fC1B9Kmw8cJ",
    "1NW4vXAMCS3AR8cqGzV7KIaDOp2SOwFTs",
    "1S7tozZwH_5bHSsYfctZCnVuXiqRI2ul1",
    "1SFrBX9QDp02cnbp2HDd-REmIPntf9Onx",
    "1XEgDs2T2_TNNFqFfc_ZjfyOQ7PHNtQpj",
    "1XmJYUYh8OCN1OwBnUCZ_pe3KUg8sTzr3",
    "1ZBAF-_S6lLlo4VvC6j8p2jv-SsAjoAwT",
    "1bEjYUMw6oTZ-a143mJIts8x8a5QI3p3y",
    "1c7M-yiWBEw4xxCwHpp05Ft8lGf2wllNH",
    "1e97qvcpyKw8jXziPPgh_gBXdolytIvUh",
    "1gYUF6aDcIguOe4N3TmlFbSsjYyLVWWX1",
    "1iFmmxDAzItq3V7tiq_fv1lAy-36FZKWm",
    "1sQ2tWvUCeTqBbV4X9Vb27c_kdOIUeRZm",
    "1xhuLSxebw8tcDC2vveZtfZdh8dXeUw3S",
  ],
);

/* ============================================================
   TREE PLANTATION
   ============================================================ */

addDriveFiles(
  "Environment" as GalleryCategory,
  "Tree Plantation",
  [
    "16_cu7yzyE1g-QNRPjOWB4u8Y9hBG8zTg",
    "1Aza6QgY_g_qNUrcMU6KxbnsdbjaKTg69",
    "1Q2BylCEjp0wvDqaXo-ULqDbNtqiHaVPG",
    "1bLITmuYMbrueSlG8kvSAXQ76atqUSluv",
    "1rjuAHwHx1nmQf_BhHKzjVX-5ilV4dpt9",
    "1uJ2LgJfQ0gIcjnmxadVh1yyrE4xulgeq",
    "1vEHKDL6wx7F2vjP87-M61PpTmDFr7-5l",
    "1xwmbxla7rVAlxFId0DgEyJ6l28E0o5t9",
  ],
);

/* ============================================================
   GENERAL GALLERY
   ============================================================ */

addDriveFiles(
  "All" as GalleryCategory,
  "KNFT Gallery",
  [
    "1-2pkWLOqc_Scm9MJQOLAf9h-_xqHAIi1",
    "1-60v8T_Cmu9q5xVax1zIiEQNaO2ShkOc",
    "1-EP8Odg34Zun9kqMuwdetH0bbBTSrTOD",
    "10MRkgeDK8BJFsCPzvM0atWgoiARHFhtP",
    "14dragXyYIfzBfbEM8o4OGXZjl_OVygWu",
    "14hjDkzmFmmVPFFpXYthhq71WmTGHVnPT",
    "15MgR31ztO7Bp59tmxnpDEujUR1GhVsjZ",
    "15sE92aOjySQ8zzM_BbzL4y7X9XcPbqm8",
    "17XzadIi_XrrvC4M88WkTLrAeNn4eoYWt",
    "17dT78IiL4IQorSoEOf5P3QxM2u54Ex0s",
    "18cTyWWVYQaRIUAs_WOGAAoWfsnGRZO9s",
    "19TIjoQUYxWOnnDRrUOYsnvUVM_2yGX95",
    "19Z1Uq80TYmfP5Yf_QEPBNXd9GSt_ogMy",
    "1CGf3m7PinIOkT5O7W40ugO59N9U34xUp",
    "1Ck7_qejI1mjrKeWwLyUuHbuhW9YaT3KS",
    "1ClOx6ENiByWnqzbJYXaVYR9jQRk1lp44",
    "1DWPnfmve7vKJqaMQq039vxl8F-ehwYJS",
    "1DYlIB2Uln6Esq1KzwHTE4S2h_38yqzun",
    "1Dhqpd65sksUJ_BNK_vr54o8WJdFRpINn",
    "1DjppE4mISMdfWSAt_bu8qInH1QMGPT5A",
    "1FgRjOvcRpKVlDR2SiIW0gHxy63s3y3Fe",
    "1GdLyjP2iVX90QiNtzg23VYDGdR3x5_PC",
    "1MGIt--y4ubfN1d6LJOdFSTv4d4vFP2Dp",
    "1PNuCoa7vQIn1zXlhALzGc_zoACyhvxU1",
    "1RvHWeS49eVzDJTTn5Z6E4cTOXrhIawxO",
    "1SgXesrLXgcQn5to2tLOYU7GcnJCEdqn1",
    "1TcGyc4eNFH8Dn06gDBj4j3c8WWIVQkmv",
    "1U_Mr7BxG5FXCq-l0yjQHRdxVv6eHl5VA",
    "1VpF-45N3O9ABaft6bGwAmAPw4XhbzxoF",
    "1W-QdXKhwndEXsREhX5ZTB2Xg9D7ELigA",
    "1YY5dYE_BWCnJMPv1m3rhMGsgllbAACi4",
    "1ZySrLacWRoeOqmkTifLp0WAY6CKMDDfJ",
    "1_laBdcR4cnYi_EwwbE6R5P09A33eT_ri",
    "1c8pfhmsZZcY5qguUpkymT5iXaPj8YJqS",
    "1cLtVvbTwvoEt0f1jBhGUZR0NgOlbAJ1t",
    "1eABGHHe1_MewjODKUHu5itGXafa55I4N",
    "1f3n7NQFpBNnrThoh7ISUP6nw0p3ZMZjn",
    "1i4FOwrJCJO-bYgnmDo0MmV8qVUX9xNj7",
    "1jFCUBnEB1tG32KETg_3iSabLiutCCazZ",
    "1jSeGBiBgNAl9CcNfd1QuucOkSry6sS4f",
    "1jhpv6y4T1JJKKrZhd0fIqtUOpWl348dR",
    "1l1O29uKoCjdr_p6n84355zocJHXAemrT",
    "1lYzp2cA37NTDCMCtM492IXhSisilR_QF",
    "1ldEB7GWZz-17HuHo7BEyGnN2rqS7auRN",
    "1o30fH6KlMrf_RrhJgvjCX4Dk59ZuIZRp",
    "1o7cU07j4e0HQnr1Jkj9UwNs3FRzEojf1",
    "1oB0BqD-u6KAc13aParnTG_UWsghMH_mG",
    "1ooxDPi4uU4FwJjZQNWNjpcFRdnHSFypJ",
    "1pzb8Us3i00QV_k465PXJKCc8MIkhKYFX",
    "1qKS7JW4V2lK1TXb6XkEEdWFdNp1uGZTC",
    "1tf2EqUa7YXLXcuKhF0156twGbMILdRhd",
    "1uJv0UhPUxgeO717s67ABChpBETt8m76D",
    "1vHEsRdX3DAVWLpd3m0KHRLLH8RNHQM4M",
    "1vaVzcqz6HF7Z-4ziKOc55fqC7_o2IcW7",
    "1wfS_fHtL3_25fLU45FOsrU5DQg5pKH2F",
    "1x2uQI5K68HLcxbRFzBx1Jg-NDJhZZaAr",
    "1x5X9nDICZjldS1vs9HxhqajKFBZRI3aq",
    "1xve99E_DNUhCV_oFsFRu465EKJk-aCOp",
    "1yBKc5GwiUFnL1WyZhE4eqMD4cAAn9kCj",
    "1yRnEHIv3TMf4X4fWgt5Fc_MjTJLrPqH6",
    "1yYz7LmPKGPZnrVzYspOjdcBJTHEBgVaP",
    "1zSSjQ3yHQig2ipIfUm0o7MnG5n77P6AG",
  ],
);

/* ============================================================
   SPORTS - KARATE
   ============================================================ */

addDriveFiles(
  "Sports" as GalleryCategory,
  "Karate",
  [
    "112QwJGVRDxxOZZ9Q7wPCewwI0BG_qLP",
  ],
);

/* ============================================================
   SPORTS - RUNNING
   ============================================================ */

addDriveFiles(
  "Sports" as GalleryCategory,
  "Running",
  [
    "18ummt1i4WJYzLeSnbIaE-lPUGAvp-COW",
    "19F8_3V1cwxV0Ox1rYGbRvP7hDlfQHlia",
    "1G77lS31IEkVkpv0aLcLMni3EJ067cnV_",
    "1HedmiS-H3-c4ejZGO_W1Tk7Fc1OHBWE-",
    "1VDrYjM3qi8I9wm0oiubNV-PNKZLz_NBw",
    "1e6zbpKT100BZqg5UUOnEXuxw2TUk4EIU",
  ],
);

/* ============================================================
   SPORTS - MALKHAMB
   ============================================================ */

addDriveFiles(
  "Sports" as GalleryCategory,
  "Malkhamb",
  [
    "1a7JyquDx6RVU5ukeyYmDFK1QK7KSOBT",
  ],
);

/* ============================================================
   COMBINED GALLERY
   ============================================================ */

const combinedGalleryItems = driveGalleryItems;

const availableGalleryCategories: GalleryCategory[] = [
  "All",
  ...Array.from(
    new Set(driveGalleryItems.map((item) => item.category)),
  ),
];

/* ============================================================
   YOUTUBE VIDEO DATA
   ============================================================ */

type YouTubeVideo = {
  id: string;
  title: string;
  aspect: "16:9" | "9:16";
};

/* ============================================================
   16:9 VIDEOS
   ============================================================ */

const youtubeVideos16x9: YouTubeVideo[] = [
  {
    id: "Ntm5BAffvas",
    title:
      "🌊 Murukeri Lake | முருக்கேரி ஏரி 💧🌿",
    aspect: "16:9",
  },
  {
    id: "QPLpPZTDf_E",
    title:
      "MUTHAMPALAYAM NEWS | 🌊 Muthampalayam Lake | முத்தாம்பாளையம் ஏரி 💧🌿",
    aspect: "16:9",
  },
  {
    id: "-hlDW3CoauY",
    title:
      "🌊 Muthampalayam Lake | முத்தாம்பாளையம் ஏரி 💧🌿",
    aspect: "16:9",
  },
  {
    id: "Zi6kv3pPDR8",
    title:
      "🌊 Muthampalayam Lake | முத்தாம்பாளையம் ஏரி 💧🌿",
    aspect: "16:9",
  },
  {
    id: "zPysaF4lNRk",
    title:
      "🌊 Nanthan Kaalvaai Scheme | நந்தன் கால்வாய் திட்டம் 💧🌱",
    aspect: "16:9",
  },
];

/* ============================================================
   9:16 SHORTS
   ============================================================ */

const youtubeVideos9x16: YouTubeVideo[] = [
  {
    id: "S575c64PrgY",
    title:
      "🌊 Tindivanam Lake — 1 Lakh Seeds Sowed 🌱💧",
    aspect: "9:16",
  },
  {
    id: "58kVDVE7sp0",
    title:
      "🌊 Tindivanam Neeramaipu Kulu | திண்டிவனம் நீரமைப்புக் குழு 💧🌿",
    aspect: "9:16",
  },
  {
    id: "0iqAtAs2A_E",
    title:
      "🌊 Murukkeri Lake — A Journey Towards Restoration 💧🌿",
    aspect: "9:16",
  },
  {
    id: "W7SJdIkyYZU",
    title:
      "🌊 Koliyanur Lake — Thamarai Seed Sowed",
    aspect: "9:16",
  },
  {
    id: "n4q-bRpc4I8",
    title:
      "🌊 Ariyalur Lake — Before & After Transformation ✨",
    aspect: "9:16",
  },
  {
    id: "j1yKZckLzFQ",
    title:
      "Infosys partners with KNFT 🤝✨",
    aspect: "9:16",
  },
  {
    id: "hIXwleFKx5s",
    title:
      "🌊 Kakuppam Lake — BEFORE vs AFTER 😱",
    aspect: "9:16",
  },
  {
    id: "2PEoDIPVOuE",
    title:
      "விழுப்புரம் மாவட்ட நிர்வாகம், நகராட்சி மற்றும் தன்னார்வலர்களின் கூட்டு முயற்சி",
    aspect: "9:16",
  },
];

/* ============================================================
   YOUTUBE VIDEO CARD
   ============================================================ */

function YouTubeVideoCard({
  video,
}: {
  video: YouTubeVideo;
}) {
  const isVertical = video.aspect === "9:16";

  return (
    <article
      className="
        overflow-hidden
        rounded-2xl
        border
        border-border
        bg-background
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div
        className={
          isVertical
            ? "mx-auto aspect-[9/16] w-full max-w-[300px] bg-black"
            : "aspect-video w-full bg-black"
        }
      >
        <iframe
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.title}
          className="h-full w-full"
          loading="lazy"
          allow="
            accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture;
            web-share
          "
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      <div className="p-4">
        <p className="text-sm font-semibold leading-6 text-foreground">
          {video.title}
        </p>
      </div>
    </article>
  );
}

/* ============================================================
   GALLERY IMAGE
   ============================================================ */

function GalleryImage({
  src,
  fallbackSrc,
  alt,
}: {
  src?: string;
  fallbackSrc?: string;
  alt: string;
}) {
  const [currentSrc, setCurrentSrc] =
    useState(src);

  const [hasError, setHasError] =
    useState(false);

  return (
    <div
      className="
        group
        relative
        aspect-[4/3]
        overflow-hidden
        rounded-xl
        bg-muted
      "
    >
      {!hasError && currentSrc ? (
        <>
          <img
            src={currentSrc}
            alt={alt}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
            "
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            referrerPolicy="no-referrer"
            onError={() => {
              if (
                fallbackSrc &&
                currentSrc !== fallbackSrc
              ) {
                setCurrentSrc(fallbackSrc);
              } else {
                setHasError(true);
              }
            }}
          />

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/35
              via-transparent
              to-transparent
            "
          />
        </>
      ) : (
        <div
          className="
            flex
            h-full
            w-full
            items-center
            justify-center
            bg-muted
          "
        >
          <span className="px-4 text-center text-xs text-muted-foreground">
            Image unavailable
          </span>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   ROUTE
   ============================================================ */

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      {
        title: "Gallery — Photos & Videos | KNFT",
      },
      {
        name: "description",
        content:
          "Photo and video gallery of KNFT's water restoration, environment, relief, education and community programmes.",
      },
      {
        property: "og:title",
        content: "KNFT Gallery",
      },
      {
        property: "og:description",
        content:
          "Photos and videos from KNFT's community work.",
      },
    ],
  }),

  component: Gallery,
});

/* ============================================================
   MAIN GALLERY
   ============================================================ */

function Gallery() {
  const [active, setActive] =
    useState<GalleryCategory>("All");

  const [visibleCount, setVisibleCount] =
    useState(24);

  const [lightbox, setLightbox] = useState<{
    src: string;
    caption: string;
  } | null>(null);

  /* ==========================================================
     FILTER ITEMS
     ========================================================== */

  const items = useMemo(() => {
    if (active === "All") {
      return combinedGalleryItems;
    }

    return combinedGalleryItems.filter(
      (item) => item.category === active,
    );
  }, [active]);

  /* ==========================================================
     VISIBLE ITEMS
     ========================================================== */

  const visibleItems = useMemo(() => {
    return items.slice(0, visibleCount);
  }, [items, visibleCount]);

  const hasMore = visibleCount < items.length;

  /* ==========================================================
     CATEGORY CHANGE
     ========================================================== */

  function handleCategoryChange(
    category: GalleryCategory,
  ) {
    setActive(category);
    setVisibleCount(24);
  }

  /* ==========================================================
     LOAD MORE
     ========================================================== */

  function handleLoadMore() {
    setVisibleCount((current) =>
      Math.min(
        current + 24,
        items.length,
      ),
    );
  }

  return (
    <>
      {/* ======================================================
          HERO
      ====================================================== */}

      <PageHero
        eyebrow="Gallery"
        title="Moments from the field"
        subtitle="Real moments from KNFT's community, environmental and social initiatives."
      />

      {/* ======================================================
          PHOTO GALLERY
      ====================================================== */}

      <Section>
        {/* ====================================================
            CATEGORY FILTERS
        ==================================================== */}

        <div className="flex flex-wrap gap-2">
          {availableGalleryCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() =>
                handleCategoryChange(category)
              }
              className={`
                rounded-full
                border
                px-4
                py-2
                text-sm
                font-medium
                transition-all
                duration-200
                ${
                  active === category
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-background text-foreground/75 hover:bg-secondary hover:text-primary"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* ====================================================
            PHOTO COUNT
        ==================================================== */}

        <p className="mt-5 text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {Math.min(
              visibleCount,
              items.length,
            )}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-foreground">
            {items.length}
          </span>{" "}
          {items.length === 1
            ? "photo"
            : "photos"}
        </p>

        {/* ====================================================
            PHOTO GRID
        ==================================================== */}

        <motion.div
          layout
          className="
            mt-10
            grid
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          <AnimatePresence mode="popLayout">
            {visibleItems.map(
              (item, index) => {
                const imageSrc = item.src;

                return (
                  <motion.button
                    key={`${item.id}-${index}`}
                    layout
                    type="button"
                    onClick={() => {
                      if (imageSrc) {
                        setLightbox({
                          src: ("fallbackSrc" in item && item.fallbackSrc) ? item.fallbackSrc : imageSrc,
                          caption:
                            item.caption ||
                            "KNFT Gallery",
                        });
                      }
                    }}
                    initial={{
                      opacity: 0,
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.96,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="
                      group
                      rounded-xl
                      text-left
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-ring
                      focus-visible:ring-offset-2
                    "
                    aria-label="Open image"
                  >
                    <GalleryImage
                      src={imageSrc}
                      fallbackSrc={
                        "fallbackSrc" in item
                          ? item.fallbackSrc
                          : undefined
                      }
                      alt={
                        item.caption ||
                        "KNFT community activity"
                      }
                    />
                  </motion.button>
                );
              },
            )}
          </AnimatePresence>
        </motion.div>

        {/* ====================================================
            LOAD MORE
        ==================================================== */}

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={handleLoadMore}
              className="
                inline-flex
                items-center
                justify-center
                rounded-full
                border
                border-primary
                bg-primary
                px-7
                py-3
                text-sm
                font-semibold
                text-primary-foreground
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-primary/90
                hover:shadow-md
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
              "
            >
              Load More Photos
            </button>
          </div>
        )}

        {/* ====================================================
            ALL PHOTOS LOADED
        ==================================================== */}

        {!hasMore &&
          items.length > 48 && (
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                All {items.length} photos loaded.
              </p>
            </div>
          )}

        {/* ====================================================
            EMPTY STATE
        ==================================================== */}

        {items.length === 0 && (
          <div
            className="
              mt-10
              rounded-2xl
              border
              border-dashed
              border-border
              p-12
              text-center
            "
          >
            <p className="text-muted-foreground">
              No photographs available in
              this category yet.
            </p>
          </div>
        )}
      </Section>

      {/* ======================================================
          WATCH THE WORK
      ====================================================== */}

      <Section tone="muted">
        <SectionHeading
          eyebrow="Watch the Work"
          title="See the change in action"
          subtitle="Watch KNFT's lake restoration, environmental and community initiatives."
        />

        {/* ====================================================
            16:9 VIDEOS
        ==================================================== */}

        <div className="mt-10">
          <div className="mb-6">
            <h3 className="text-xl font-bold tracking-tight">
              16:9 Videos
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Full-length stories and project coverage
              from KNFT's field work.
            </p>
          </div>

          <div
            className="
              grid
              gap-6
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {youtubeVideos16x9.map(
              (video) => (
                <YouTubeVideoCard
                  key={video.id}
                  video={video}
                />
              ),
            )}
          </div>
        </div>

        {/* ====================================================
            9:16 VIDEOS
        ==================================================== */}

        <div className="mt-16">
          <div className="mb-6">
            <h3 className="text-xl font-bold tracking-tight">
              9:16 Shorts
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Short videos and quick updates from
              KNFT's activities.
            </p>
          </div>

          <div
            className="
              grid
              gap-6
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
            "
          >
            {youtubeVideos9x16.map(
              (video) => (
                <YouTubeVideoCard
                  key={video.id}
                  video={video}
                />
              ),
            )}
          </div>
        </div>
      </Section>

      {/* ======================================================
          LIGHTBOX
      ====================================================== */}

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed
              inset-0
              z-[80]
              flex
              items-center
              justify-center
              bg-black/90
              p-4
              sm:p-6
            "
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
          >
            <motion.div
              initial={{
                scale: 0.95,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.95,
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                relative
                w-full
                max-w-5xl
              "
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              {/* CLOSE BUTTON */}

              <button
                type="button"
                onClick={() =>
                  setLightbox(null)
                }
                aria-label="Close image"
                className="
                  absolute
                  right-3
                  top-3
                  z-10
                  inline-flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/30
                  bg-black/50
                  text-white
                  backdrop-blur-md
                  transition-colors
                  hover:bg-black/70
                "
              >
                <X className="h-5 w-5" />
              </button>

              {/* IMAGE */}

              <div
                className="
                  overflow-hidden
                  rounded-2xl
                  bg-black
                  shadow-2xl
                "
              >
                <img
                  src={lightbox.src}
                  alt={lightbox.caption}
                  className="
                    max-h-[85vh]
                    w-full
                    object-contain
                  "
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}